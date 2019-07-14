const functions = require("firebase-functions");
const { getAllNoteBooks, createOneNotebook } = require("./handlers/notebooks");
const { signUpUser, loginUser, uploadImage } = require("./handlers/users");
const { Auth } = require("./Util/Auth");
const app = require("express")();

//Notebook route
app.get("/users", getAllNoteBooks);
app.post("/user", Auth, createOneNotebook);

//sign-up route
app.post("/auth/signup", signUpUser);
app.post("/auth/login", loginUser);
app.post("/user/image", Auth, uploadImage);

exports.api = functions.region("asia-east2").https.onRequest(app);
