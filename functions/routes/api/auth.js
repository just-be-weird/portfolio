const express = require("express");
const router = express.Router();
const { admin, db, firebaseInstance } = require("../../Util/admin");
const { validateSignUpData, validateLoginData, reduceUserDetails } = require("../../Util/validators");



router.post("/login", async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };
    
    try {
        const { valid, errors } = validateLoginData(user);
        if (!valid) return res.status(400).json(errors);

        const data = await firebaseInstance
            .auth()
            .signInWithEmailAndPassword(user.email, user.password);

        const token = await data.user.getIdToken();
        if (token) {
            return res.status(200).json({ token });
        }
    } catch (err) {
        console.error(err);
        if (err.code === "auth/wrong-password") {
            return res
                .status(403) //unauthorized
                .json({ general: "Incorrect credentials, Please try again." });
        }
        return res.status(500).json({ error: err.code });
    }
});

module.exports = router;
