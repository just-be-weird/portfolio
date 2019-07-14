import * as firebase from "firebase";
import config from './Firebase.config'

firebase.initializeApp(config);

// const db = firebase.database();//realtime-database
const db = firebase.firestore(); //modern firestore
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, db as default };
