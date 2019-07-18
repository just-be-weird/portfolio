const functions = require("firebase-functions");
// const { getAllNoteBooks, createOneNotebook, getNoteBook } = require("./handlers/notebooks");
// const {
//     signUpUser,
//     loginUser,
//     uploadImage,
//     addUserDetails,
//     getAuthenticatedUser,
// } = require("./handlers/users");
const { Auth } = require("./Util/Auth");
const express = require("express");
const app = express();

//Notebook route
// app.get("/notebooks", getAllNoteBooks);
// app.post("/notebook", Auth, createOneNotebook);
// app.get('/notebook/:notebookId', getNoteBook);
// app.delete('/scream/:screamId', Auth, deleteScream);
// app.get('/scream/:screamId/like', Auth, likeScream);
// app.get('/scream/:screamId/unlike', Auth, unlikeScream);
// app.post('/scream/:screamId/comment', Auth, commentOnScream);

//sign-up route
// app.post("/auth/signup", signUpUser);
app.use("/auth", require('./routes/api/auth'));
// app.post("/user/image", Auth, uploadImage);
// app.post("/user", Auth, addUserDetails);
app.use("/user", Auth, require("./routes/api/users"));
// app.get('/user/:handle', getUserDetails);
// app.post('/notifications', Auth, markNotificationsRead);

//server static assets in production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static("build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
}

exports.api = functions.region("asia-east2").https.onRequest(app);
