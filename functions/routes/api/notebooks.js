const { db } = require("../../Util/admin");

exports.getAllNoteBooks = async (req, res) => {
    const data = await db
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
};

exports.createOneNotebook = async (request, response) => {
    let notebook = {
        body: request.body.body,
        createdAt: new Date().toISOString(),
        userHandel: request.user.handle,
    };
    const data = await db.collection("notebooks").add(notebook);
    response.json({ msg: `document ${data.id} created.` });
};

exports.getNoteBook = async (req, res) => {
    try {
        let notebookData = {};
        const notebook = await db
            .doc(`/notebooks/${req.params.notebookId}`)
            .get();

        if (!notebook.exists) {
            return res.status(404).json({ error: "Notebook not found" });
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
};