const express = require("express");
const router = express.Router();
const { admin, db, firebaseInstance, config } = require("../../Util/admin");
const {
    validateSignUpData,
    validateLoginData,
} = require("../../Util/validators");

//@route    POST auth/login
//@desc     Login and get auth token
//@access   Public
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
            const _dtkn = await admin.auth().verifyIdToken(token);
            return res.status(200).json({ token, _dtkn });
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
    return res
        .status(403) //unauthorized
        .json({ general: "Incorrect credentials, Please try again." });
});

//@route    POST auth/signup
//@desc     Signup and set user details in "users" collection
//@access   Public
router.post("/signup", async (req, res) => {
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
                const _dtkn = await admin.auth().verifyIdToken(token);

                return res.status(201).json({ token, _dtkn });
            }
        }
    } catch (err) {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
            return res
                .status(400)
                .json({ handle: "This email is already in use" });
        }
        return res
            .status(500)
            .json({ general: "Something went wrong, Please try again." });
    }
    return res.status(400).json({ handle: "This email is already in use" });
});

module.exports = router;
