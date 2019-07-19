const admin = require("firebase-admin");
const firebase = require("firebase");
const functions = require("firebase-functions");

admin.initializeApp({ credential: admin.credential.applicationDefault() });
const db = admin.firestore();

const config = functions.config();
const firebaseInstance = firebase.initializeApp({
    apiKey: config.portfolio.api_key,
    authDomain: config.portfolio.auth_domain,
    databaseURL: config.portfolio.database_url,
    projectId: config.portfolio.project_id,
    storageBucket: config.portfolio.storage_bucket,
    messagingSenderId: config.portfolio.messaging_sender_id,
    appId: config.portfolio.app_id,
});

module.exports = { admin, db, firebaseInstance, config };
