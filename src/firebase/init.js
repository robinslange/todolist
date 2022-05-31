//import firebase from "firebase";
const firebase = require("firebase/app");
// eslint-disable-next-line no-unused-vars
import "firebase/firestore";

// firebase config
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

//firebase.analytics();

// Initialize Firebase
// eslint-disable-next-line
const firestore = firebase.initializeApp(config);
const db = firebase.firestore();

export default db;
