const functions = require("firebase-functions");
const firebase = require("firebase");
const admin = require("firebase-admin");
const app = require("express")();

admin.initializeApp({ credential: admin.credential.applicationDefault() });
const firestoreDB = admin.firestore();

app.get("/users", async (req, res) => {
    const data = await firestoreDB
        .collection("notebooks")
        .orderBy("createdAt", "desc")
        .get();
    let notebooks = [];
    if (data) {
        data.forEach(doc => {
            notebooks.push({
                userId: doc.id,
                body: doc.data().body,
                userHandel: doc.data().userHandel,
                createdAt: doc.data().createdAt,
            });
        });
        res.json(notebooks);
        // response.status(400).json({msg: "Error at get request."});
    }
});

app.post("/user", async (request, response) => {
    let notebook = {
        body: request.body.body,
        createdAt: new Date().toISOString(),
        userHandel: request.body.userHandel,
    };
    const data = await firestoreDB.collection("notebooks").add(notebook);
    response.json({ msg: `document ${data.id} created.` });
});

//sign-up route
app.post("/auth/signup", async (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        rePassword: req.body.rePassword,
        handle: req.body.handle,
    };

    //todo validate data
    const data = await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
    if (!data) {
        return res.status(401).json({ message: "invalid credentials" });
    }
    res.status(201).json({
        message: `user ${data.user.uid} signed up successfully.`
    });
});

exports.api = functions.region("asia-east2").https.onRequest(app);
