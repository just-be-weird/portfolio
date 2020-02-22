const { admin, db } = require("./admin");

//Auth Middelware
exports.Auth = async (req, res, next) => {
  let idToken;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
      console.error("No Auth Token Found.");
      return res.status(403).json({ error: "Auth Error" });
    }
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken) {
      req.user = decodedToken;
      const data = await db
        .collection("users")
        .where("userId", "==", req.user.uid)
        .limit(1)
        .get();
      if (data) {
        req.user.handle = data.docs[0].data().handle;
        req.user.imageUrl = data.docs[0].data().imageUrl;
        return next();
      }
    }
    return res.status(403).json({ error: "No valid auth token found." });
  } catch (err) {
    console.error(err);
    if (err.code === "auth/id-token-expired") {
      return res.status(408).json({ error: "Token Expired, please login." });
    }
    return res.status(403).json({ error: "No valid auth token found." });
  }
};
