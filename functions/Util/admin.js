const admin = require("firebase-admin");
const firebase = require("firebase");
const functions = require("firebase-functions");

const config = functions.config();
const apiConfig = {
    apiKey: config.portfolio.api_key,
    authDomain: config.portfolio.auth_domain,
    databaseURL: config.portfolio.database_url,
    projectId: config.portfolio.project_id,
    storageBucket: config.portfolio.storage_bucket,
    messagingSenderId: config.portfolio.messaging_sender_id,
    appId: config.portfolio.app_id,
};

admin.initializeApp({ credential: admin.credential.applicationDefault(), ...apiConfig });
const db = admin.firestore();
const firebaseInstance = firebase.initializeApp(apiConfig);

module.exports = { admin, db, firebaseInstance, config };
