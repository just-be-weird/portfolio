const functions = require("firebase-functions");
const { getAllNoteBooks, createOneNotebook, getNoteBook } = require("./handlers/notebooks");
const {
    signUpUser,
    loginUser,
    uploadImage,
    addUserDetails,
    getAuthenticatedUser,
} = require("./handlers/users");
const { Auth } = require("./Util/Auth");
const app = require("express")();

//Notebook route
app.get("/notebooks", getAllNoteBooks);
app.post("/notebook", Auth, createOneNotebook);
app.get('/notebook/:notebookId', getNoteBook);
// app.delete('/scream/:screamId', Auth, deleteScream);
// app.get('/scream/:screamId/like', Auth, likeScream);
// app.get('/scream/:screamId/unlike', Auth, unlikeScream);
// app.post('/scream/:screamId/comment', Auth, commentOnScream);

//sign-up route
app.post("/auth/signup", signUpUser);
app.post("/auth/login", loginUser);
app.post("/user/image", Auth, uploadImage);
app.post("/user", Auth, addUserDetails);
app.get("/user", Auth, getAuthenticatedUser);
// app.get('/user/:handle', getUserDetails);
// app.post('/notifications', Auth, markNotificationsRead);

exports.api = functions.region("asia-east2").https.onRequest(app);
