const functions = require("firebase-functions");
const express = require("express");
const app = express();
const { db } = require("./Util/admin");
const path = require("path");
//Enable Cors
const cors = require("cors")({ origin: true });
app.use(cors);
app.options('*', cors);
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
            if (
                notebook.exists &&
                notebook.data().handle !== snapshot.data().handle
            ) {
                await db.doc(`/notifications/${snapshot.id}`).set({
                    createdAt: new Date().toISOString(),
                    recipient: notebook.data().handle,
                    sender: snapshot.data().handle,
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
            //to avoid creating notifications for self actions
            if (
                notebook.exists &&
                notebook.data().handle !== snapshot.data().handle
            ) {
                await db.doc(`/notifications/${snapshot.id}`).set({
                    createdAt: new Date().toISOString(),
                    recipient: notebook.data().handle,
                    sender: snapshot.data().handle,
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

exports.onUserImageChange = functions
    .region("asia-east2")
    .firestore.document("/users/{userId}")
    .onUpdate(async change => {
        // console.log(change.before.data());
        // console.log(change.after.data());
        if (change.before.data().imageUrl !== change.after.data().imageUrl) {
            // console.log("image has changed");
            const batch = db.batch();
            const userNotebook = await db
                .collection("notebooks")
                .where("handle", "==", change.before.data().handle)
                .get();

            userNotebook.forEach(notebook => {
                const notebookOld = db.doc(`/notebooks/${notebook.id}`);
                batch.update(notebookOld, {
                    userImage: change.after.data().imageUrl,
                });
            });
            return batch.commit();
        } else return true;
    });

exports.onNotebookDelete = functions
    .region("asia-east2")
    .firestore.document("/notebooks/{notebookId}")
    .onDelete(async (snapshot, context) => {
        try {
            const notebookId = context.params.notebookId;
            const batch = db.batch();
            const comments = await db
                .collection("comments")
                .where("notebookId", "==", notebookId)
                .get();

            comments.forEach(comment => {
                batch.delete(db.doc(`/comments/${comment.id}`));
            });

            const likes = await db
                .collection("likes")
                .where("notebookId", "==", notebookId)
                .get();

            likes.forEach(like => {
                batch.delete(db.doc(`/likes/${like.id}`));
            });

            const notifications = await db
                .collection("notifications")
                .where("notebookId", "==", notebookId)
                .get();

            notifications.forEach(notification => {
                batch.delete(db.doc(`/notifications/${notification.id}`));
            });

            return batch.commit();
        } catch (err) {
            console.error(err);
        }
        return true;
    });
