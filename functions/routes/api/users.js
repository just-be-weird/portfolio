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

    try {
        if (doc.exists) {
            userData.credentials = doc.data();

            const likes = await db
                .collection("likes")
                .where("userHandle", "==", req.user.handle)
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
                            notificationId: notification.id,
                        });
                    });
                    return res.json(userData);
                }
            }
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
                .where("userHandle", "==", req.params.handle)
                .orderBy("createdAt", "desc")
                .get();

            userData.notebooks = [];
            user.forEach(u => {
                userData.notebooks.push({
                    body: u.data().body,
                    createdAt: u.data().createdAt,
                    userHandle: u.data().userHandle,
                    userImage: u.data().userImage,
                    likeCount: u.data().likeCount,
                    commentCount: u.data().commentCount,
                    notebookId: u.id,
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
                        contentType: imageToBeUploaded.mimetype,
                    },
                },
            });
        
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
            config.portfolio.storage_bucket
            }/o/${imageFileName}?alt=media`;

        await db.doc(`/users/${req.user.handle}`).update({ imageUrl });
        res.json({ message: "Image uploaded.", imageUrl });
    });
    busboy.end(req.rawBody);
});

module.exports = router;
