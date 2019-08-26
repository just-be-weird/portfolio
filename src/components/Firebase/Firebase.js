// import * as firebase from "firebase";//use this for devlopment only
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
// import 'firebase/database';//realtime-database
import 'firebase/firestore';
import config from './Firebase.config'

firebase.initializeApp(config);

// const db = firebase.database();//realtime-database
const db = firebase.firestore(); //modern firestore
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, db as default };
