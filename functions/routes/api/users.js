const express = require("express");
const router = express.Router();
const { Auth } = require("../../Util/Auth");
const { admin, db, config } = require("../../Util/admin");
const { reduceUserDetails } = require("../../Util/validators");

//@route    POST /user/add-details
//@desc     Add user details
//@access   Protected
router.post("/add-details", Auth, async (req, res) => {
  let userData = reduceUserDetails(req.body);
  try {
    const data = await db.doc(`/users/${req.user.handle}`).update(userData);

    return res.json({ message: "Details added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.code });
  }
});

//@route    GET /user/get-details
//@desc     Get own user Details
//@access   Protected
router.get("/get-details", Auth, async (req, res) => {
  let userData = {};
  const doc = await db.doc(`/users/${req.user.handle}`).get();
  const notebookData = await db.doc(`notebooks/${req.user.user_id}`).get();

  try {
    if (doc.exists) {
      userData.credentials = doc.data();

      const likes = await db
        .collection("likes")
        .where("handle", "==", req.user.handle)
        .get();

      if (likes) {
        userData.likes = [];
        likes.forEach(like => {
          userData.likes.push(like.data());
        });

        const notifications = await db
          .collection("notifications")
          .where("recipient", "==", req.user.handle)
          .orderBy("createdAt", "desc")
          .limit(10)
          .get();

        if (notifications) {
          userData.notifications = [];
          notifications.forEach(notification => {
            userData.notifications.push({
              recipient: notification.data().recipient,
              sender: notification.data().sender,
              createdAt: notification.data().createdAt,
              notebookId: notification.data().notebookId,
              type: notification.data().type,
              read: notification.data().read,
              notificationId: notification.id
            });
          });
        }
      }
      if (notebookData.exists) {
        userData.social = {};
        userData.social = notebookData.data();
      }
      return res.json(userData);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.code });
  }
  return res.status(404).json({ error: "User dosn't exists." });
});

//@route    GET /user/:handle
//@desc     Get any user details
//@access   Public
router.get("/:handle", async (req, res) => {
  let userData = {};
  const userDoc = await db.doc(`/users/${req.params.handle}`).get();
  try {
    if (userDoc.exists) {
      userData.user = userDoc.data();
      const user = await db
        .collection("notebooks")
        .where("handle", "==", req.params.handle)
        .orderBy("createdAt", "desc")
        .get();

      userData.notebooks = [];
      user.forEach(u => {
        userData.notebooks.push({
          body: u.data().body,
          createdAt: u.data().createdAt,
          handle: u.data().handle,
          userImage: u.data().userImage,
          likeCount: u.data().likeCount,
          commentCount: u.data().commentCount,
          notebookId: u.id
        });
      });
      return res.status(200).json(userData);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.code });
  }
  return res.status(404).json({ error: "User dosn't exists." });
});

//@route    GET /user/:userId/follow
//@desc     Follow user
//@access   Protected
router.get("/:userId/follow", Auth, async (req, res) => {
  // console.log("req",req.params.userId)
  try {
    // Get the follower doc for requested user
    const followerDocument = await db
      .collection("followers")
      .where("handle", "==", req.user.handle)
      .where("userId", "==", req.params.userId)
      .limit(1)
      .get();
    // Check if requested user has created profile yet?
    const notebookDocument = await db.doc(`/notebooks/${req.params.userId}`);
    let notebookData;
    const notebook = await notebookDocument.get();
    if (notebook.exists) {
      notebookData = notebook.data();
      notebookData.userId = notebook.id;
      if (req.params.userId === req.user.user_id) {
        return res
          .status(400)
          .json({ warning: `Can't follow your own profile.` });
      } else if (followerDocument.empty) {
        await db.collection("followers").add({
          userId: req.params.userId,
          handle: req.user.handle
        });
        notebookData.followerCount++;
        await notebookDocument.update({
          followerCount: notebookData.followerCount
        });
        return res.json(notebookData);
      } else {
        return res
          .status(400)
          .json({
            warning: `Already following ${notebookData.handle}'s profile.`
          });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
  return res
    .status(404)
    .json({ error: `${req.params.userId} has not created profile yet.` });
});

//@route    GET /user/:userId/unfollow
//@desc     Unfollow an user
//@access   Protected
router.get("/:userId/unfollow", Auth, async (req, res) => {
  try {
    const followerDocument = await db
      .collection("followers")
      .where("handle", "==", req.user.handle)
      .where("userId", "==", req.params.userId)
      .limit(1)
      .get();

    const notebookDocument = await db.doc(`/notebooks/${req.params.userId}`);
    let notebookData;
    const notebook = await notebookDocument.get();
    if (notebook.exists) {
      notebookData = notebook.data();
      notebookData.notebookId = notebook.id;
      if (req.params.userId === req.user.user_id) {
        return res
          .status(400)
          .json({ warning: `Can't unfollow your own profile.` });
      } else if (followerDocument.empty) {
        return res
          .status(400)
          .json({ error: `Not following ${notebookData.handle}` });
      } else {
        await db.doc(`/followers/${followerDocument.docs[0].id}`).delete();
        notebookData.followerCount--;
        await notebookDocument.update({
          followerCount: notebookData.followerCount
        });

        return res.json(notebookData);
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
  return res
    .status(404)
    .json({ error: `${req.params.userId} has not created profile yet.` });
});

//@route    POST /user/image/uploads
//@desc     Upload image for user profile
//@access   Protected
router.post("/image/uploads", Auth, async (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (
      mimetype !== "image/svg+xml" &&
      mimetype !== "image/png" &&
      mimetype !== "image/jpg"
    ) {
      return res
        .status(400)
        .json({ error: "Wrong file type selected for upload." });
    }

    const imageExt = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExt}`;
    //create tmp location for upload
    const filepath = path.join(os.tmpdir(), imageFileName);
    //create mime info
    imageToBeUploaded = { filepath, mimetype };
    //create this file on filesys
    file.pipe(fs.createWriteStream(filepath));
    return true;
  });

  busboy.on("finish", async () => {
    await admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype
          }
        }
      });
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.portfolio.storage_bucket}/o/${imageFileName}?alt=media`;

    await db.doc(`/users/${req.user.handle}`).update({ imageUrl });
    res.json({ message: "Image uploaded.", imageUrl });
  });
  busboy.end(req.rawBody);
});

module.exports = router;
