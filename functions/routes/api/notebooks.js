const { Auth } = require("../../Util/Auth");
const { db } = require("../../Util/admin");
const express = require("express");
const router = express.Router();

//@route    GET /notebooks
//@desc     Gett all the notebooks
//@access   Public
router.get("/all", async (req, res) => {
    let notebooks = [];
    try {
        const data = await db
            .collection("notebooks")
            .orderBy("createdAt", "desc")
            .get();
        if (data) {
            data.forEach(doc => {
                notebooks.push({
                    userId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                });
            });
            return res.json(notebooks);
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: "Error at get request." });
    }
});

//@route    POST /notebook
//@desc     create a notebook for logged in user
//@access   Protected
router.post("/", Auth, async (request, response) => {
    let notebook = {
        body: request.body.body,
        createdAt: new Date().toISOString(),
        userHandle: request.user.handle,
    };
    const data = await db.collection("notebooks").add(notebook);
    response.json({ msg: `document ${data.id} created.` });
});

//@route    GET /notebook/:notebookId
//@desc     Get a notebook for logged in user by ID
//@access   Protected
router.get("/:notebookId", async (req, res) => {
    try {
        let notebookData = {};
        //get the data for the requested id
        const notebook = await db
            .doc(`/notebooks/${req.params.notebookId}`)
            .get();

        if (!notebook.exists) {
            return res.status(404).json({ error: "Notebook not found." });
        }

        notebookData = notebook.data();
        notebookData.notebookId = notebook.id;

        const comments = await db
            .collection("comments")
            .orderBy("createdAt", "desc")
            .where("notebookId", "==", req.params.notebookId)
            .get();

        notebookData.comments = [];
        comments.forEach(comment => {
            notebookData.comments.push(comment.data());
        });
        return res.json(notebookData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.code });
    }
});

//@route    POST /notebook/:notebookId/comment
//@desc     Add a comment on notebook for logged in user by ID
//@access   Protected
router.post("/:notebookId/comment", Auth, async (req, res) => {
    if (req.body.body.trim() === "")
        return res.status(400).json({ error: "Must not be empty." });

    const newComment = {
        body: req.body.body,
        createdAt: new Date().toISOString(),
        notebookId: req.params.notebookId,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
    };
    try {
        const notebook = await db
            .doc(`/notebooks/${req.params.notebookId}`)
            .get();
        if (!notebook.exists) {
            return res.status(404).json({ error: "Notebook not found." });
        }
        await notebook.ref.update({
            commentCount: notebook.data().commentCount + 1,
        });
        await db.collection("comments").add(newComment);
        res.status(201).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

//@route    GET /notebook/:notebookId/like
//@desc     Add a comment on notebook for logged in user by ID
//@access   Protected
router.get("/:notebookId/like", Auth, async (req, res) => {
    try {
        const likeDocument = await db
            .collection("likes")
            .where("userHandle", "==", req.user.handle)
            .where("notebookId", "==", req.params.notebookId)
            .limit(1)
            .get();

        const notebookDocument = await db.doc(
            `/notebooks/${req.params.notebookId}`
        );
        let notebookData;
        const notebook = await notebookDocument.get();
        if (notebook.exists) {
            notebookData = notebook.data();
            notebookData.notebookId = notebook.id;
            if (likeDocument.empty) {
                await db.collection("likes").add({
                    notebookId: req.params.notebookId,
                    userHandle: req.user.handle,
                });
                notebookData.likeCount++;
                await notebookDocument.update({
                    likeCount: notebookData.likeCount,
                });
                return res.json(notebookData);
            } else {
                return res
                    .status(400)
                    .json({ error: "Notebook already liked." });
            }
        }
        return res.status(404).json({ error: "Notebook not found." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

//@route    GET /notebook/:notebookId/unlike
//@desc     Add a comment on notebook for logged in user by ID
//@access   Protected
router.get("/:notebookId/unlike", Auth, async (req, res) => {
    try {
        const likeDocument = await db
            .collection("likes")
            .where("userHandle", "==", req.user.handle)
            .where("notebookId", "==", req.params.notebookId)
            .limit(1)
            .get();

        const notebookDocument = await db.doc(
            `/notebooks/${req.params.notebookId}`
        );
        let notebookData;
        const notebook = await notebookDocument.get();
        if (notebook.exists) {
            notebookData = notebook.data();
            notebookData.notebookId = notebook.id;
            if (likeDocument.empty) {
                return res.status(400).json({ error: "Notebook not liked." });
            } else {
                await db.doc(`/likes/${likeDocument.docs[0].id}`).delete();
                notebookData.likeCount--;
                await notebookDocument.update({
                    likeCount: notebookData.likeCount,
                });

                return res.json(notebookData);
            }
        }
        return res.status(404).json({ error: "Notebook not found." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

//@route    DELETE /notebook/:notebookId
//@desc     Delete a notebook from a notebook
//@access   Protected
router.delete("/:notebookId", Auth, async (req, res) => {
    try {
        const notebookDocument = await db.doc(
            `/notebooks/${req.params.notebookId}`
        );
        const notebook = await notebookDocument.get();
        if (notebook.exists) {
            if (notebook.data().userHandle !== req.user.handle) {
                return res.status(403).json({ error: "Not Authorized." });
            }
            await notebookDocument.delete();
            return res.status(200).json({ message: "Notebook deleted." });
        }
        return res.status(404).json({ error: "Notebook not found." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

module.exports = router;
