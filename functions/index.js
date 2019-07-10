const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();

admin.initializeApp({ credential: admin.credential.applicationDefault() });
const firestoreDB = admin.firestore();

app.get("/users", async (req, res) => {
    const data = await firestoreDB.collection("notebooks").get();
    let notebooks = [];
    if (data) {
        data.forEach(doc => {
            notebooks.push(doc.data());
        });
        res.json(notebooks);
        // response.status(400).json({msg: "Error at get request."});
    }
});

exports.createUsers = functions.https.onRequest(async (request, response) => {
    let notebook = {
        body: request.body.body,
        createdAt: new Date().toISOString(),
        userHandel: request.body.userHandel,
    };
    const data = await firestoreDB.collection("notebooks").add(notebook);
    response.json({ msg: `document ${data.id} created.` });
});

exports.api = functions.https.onRequest(app);
