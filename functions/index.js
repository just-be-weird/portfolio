const functions = require("firebase-functions");
const express = require("express");
const app = express();

//Notebook route
app.use("/notebook", require('./routes/api/notebooks'));
//Sign-up Route
app.use("/auth", require('./routes/api/auth'));
//User Action Route
app.use("/user", require("./routes/api/users"));

//server static assets in production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static("build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
}

exports.api = functions.region("asia-east2").https.onRequest(app);
