const functions = require("firebase-functions");
const express = require("express");
const app = express();
const { db } = require("./Util/admin");

//Notebook route
app.use("/notebook", require("./routes/api/notebooks"));
//Sign-up Route
app.use("/auth", require("./routes/api/auth"));
//User Action Route
app.use("/user", require("./routes/api/users"));
//Notification Route
app.use("/notifications", require("./routes/api/notifications"));

//server static assets in production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static("build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
}

exports.api = functions.region("asia-east2").https.onRequest(app);

exports.createNotificationOnLike = functions
    .region("asia-east2")
    .firestore.document("likes/{id}")
    .onCreate(async snapshot => {
        const notebook = await db
            .doc(`/notebooks/${snapshot.data().notebookId}`)
            .get();
        try {
            if (notebook.exists) {
                await db.doc(`/notifications/${snapshot.id}`).set({
                    createdAt: new Date().toISOString(),
                    recipient: notebook.data().userHandle,
                    sender: snapshot.data().userHandle,
                    type: "like",
                    read: false,
                    notebookId: notebook.id,
                });
                return;
            }
        } catch (err) {
            console.error(err);
            return;
        }
    });

exports.deleteNotificationOnUnlike = functions
    .region("asia-east2")
    .firestore.document("likes/{id}")
    .onDelete(async snapshot => {
        try {
            await db.doc(`/notifications/${snapshot.id}`).delete();
            return;
        } catch (err) {
            console.error(err);
            return;
        }
    });

exports.createNotificationOnComment = functions
    .region("asia-east2")
    .firestore.document("comments/{id}")
    .onCreate(async snapshot => {
        const notebook = await db
            .doc(`/notebooks/${snapshot.data().notebookId}`)
            .get();
        try {
            if (notebook.exists) {
                await db.doc(`/notifications/${snapshot.id}`).set({
                    createdAt: new Date().toISOString(),
                    recipient: notebook.data().userHandle,
                    sender: snapshot.data().userHandle,
                    type: "comment",
                    read: false,
                    notebookId: notebook.id,
                });
                return;
            }
        } catch (err) {
            console.error(err);
            return;
        }
    });
