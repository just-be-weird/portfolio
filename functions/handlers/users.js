const { admin, db } = require("../Util/admin");
const firebase = require("firebase");
const config = require("../../src/components/Firebase/Firebase.config");
const { validateSignUpData, validateLoginData } = require("../Util/validators");

// Initialize the default app
firebase.initializeApp(config);

exports.signUpUser = async (req, res) => {
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
            const data = await firebase
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
};

exports.loginUser = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const { valid, errors } = validateLoginData(user);
        if (!valid) return res.status(400).json(errors);

        const data = await firebase
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
};

exports.uploadImage = async (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');
  
    const busboy = new BusBoy({ headers: req.headers });
  
    let imageToBeUploaded = {};
    let imageFileName;
  
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        if (mimetype !== "image/svg+xml" && mimetype !== "image/png" && mimetype !== "image/jpg") {
            return res
                .status(400)
                .json({ error: "Wrong file type submitted" });
        }

        const imageExt = filename.split(".")[filename.split(".").length - 1];
        imageFileName = `${Math.round(Math.random() * 1000000000000).toString()}.${imageExt}`;
        //create tmp location for upload
        const filepath = path.join(os.tmpdir(), imageFileName);
        //create mime info
        imageToBeUploaded = { filepath, mimetype };
        //create this file on filesys
        file.pipe(fs.createWriteStream(filepath)); 
    });

    busboy.on("finish",async () => {
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

        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;

        await db.doc(`/users/${req.user.handle}`).update({ imageUrl });
        res.json({ message: "Image uploaded." });
    });
    busboy.end(req.rawBody);
};
