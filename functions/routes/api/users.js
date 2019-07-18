const express = require('express');
const router = express.Router();
const { admin, db, firebaseInstance } = require("../../Util/admin");
// const config = require("../../../src/components/Firebase/Firebase.config");
const { validateSignUpData, validateLoginData, reduceUserDetails } = require("../../Util/validators");

// Initialize the default appz
// firebase.initializeApp(config);

//@route    GET api/users
//@desc     Get User Profile
//@access   Private
router.get('/',async (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        rePassword: req.body.rePassword,
        handle: req.body.handle,
    };

    try {
        const { valid, errors } = validateSignUpData(newUser);

        const noImage = "527717227600.svg";

        if (!valid) return res.status(400).json(errors);

        const doc = await db.doc(`/users/${newUser.handle}`).get();
        if (doc.exists) {
            return res.status(400).json({ handle: "This handle is taken." });
        } else {
            const data = await firebaseInstance
                .auth()
                .createUserWithEmailAndPassword(
                    newUser.email,
                    newUser.password
                );
            const token = await data.user.getIdToken();
            if (token) {
                const userCredentials = {
                    handle: newUser.handle,
                    email: newUser.email,
                    createdAt: new Date().toISOString(),
                    imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
                        config.storageBucket
                    }/o/${noImage}?alt=media`,
                    userId: data.user.uid,
                };

                await db.doc(`/users/${newUser.handle}`).set(userCredentials);

                return res.status(201).json({ token });
            }
        }
    } catch (err) {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
            return res
                .status(400)
                .json({ handle: "This email is already in use" });
        }
        return res.status(500).json({ error: err.code });
    }
});


// exports.loginUser = ;
module.exports = router;


// //add user details
// exports.addUserDetails = async (req, res) => {
//     let userDetails = reduceUserDetails(req.body);
//     try {
//         const data = await db.doc(`/users/${req.user.handle}`)
//           .update(userDetails);

//         return res.json({ message: 'Details added successfully' });
//     } catch(err) {
//       console.error(err);
//       return res.status(500).json({ error: err.code });
//     }
// };

// //Get own user Details
// exports.getAuthenticatedUser = async (req, res) => {
//     let userData = {};
//     const doc = await db.doc(`/users/${req.user.handle}`).get();

//     try {
//         if (doc.exists) {
//             userData.credentials = doc.data();
    
//             const likes = await db
//               .collection('likes')
//               .where('userHandle', '==', req.user.handle).get();
    
//             if (likes) {
//                 userData.likes = [];
//                 likes.forEach((like) => {
//                   userData.likes.push(like.data());
//                 });
    
//                 const notifications = await db
//                   .collection('notifications')
//                   .where('recipient', '==', req.user.handle)
//                   .orderBy('createdAt', 'desc')
//                   .limit(10)
//                   .get();

//                 if (notifications) {
//                     userData.notifications = [];
//                     notifications.forEach((notification) => {
//                         userData.notifications.push({
//                             recipient: notification.data().recipient,
//                             sender: notification.data().sender,
//                             createdAt: notification.data().createdAt,
//                             screamId: notification.data().screamId,
//                             type: notification.data().type,
//                             read: notification.data().read,
//                             notificationId: notification.id
//                         });
//                     });
//                     return res.json(userData);
//                 }
//             }
//         }
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: err.code });
//     }
// };

// //Upload image for user profile
// exports.uploadImage = async (req, res) => {
//     const BusBoy = require('busboy');
//     const path = require('path');
//     const os = require('os');
//     const fs = require('fs');
  
//     const busboy = new BusBoy({ headers: req.headers });
  
//     let imageToBeUploaded = {};
//     let imageFileName;
  
//     busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
//         if (mimetype !== "image/svg+xml" && mimetype !== "image/png" && mimetype !== "image/jpg") {
//             return res
//                 .status(400)
//                 .json({ error: "Wrong file type submitted" });
//         }

//         const imageExt = filename.split(".")[filename.split(".").length - 1];
//         imageFileName = `${Math.round(Math.random() * 1000000000000).toString()}.${imageExt}`;
//         //create tmp location for upload
//         const filepath = path.join(os.tmpdir(), imageFileName);
//         //create mime info
//         imageToBeUploaded = { filepath, mimetype };
//         //create this file on filesys
//         file.pipe(fs.createWriteStream(filepath)); 
//     });

//     busboy.on("finish",async () => {
//         await admin
//             .storage()
//             .bucket()
//             .upload(imageToBeUploaded.filepath, {
//                 resumable: false,
//                 metadata: {
//                     metadata: {
//                         contentType: imageToBeUploaded.mimetype,
//                     },
//                 },
//             });

//         const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;

//         await db.doc(`/users/${req.user.handle}`).update({ imageUrl });
//         res.json({ message: "Image uploaded." });
//     });
//     busboy.end(req.rawBody);
// };
