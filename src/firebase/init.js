//import firebase from "firebase";
const firebase = require("firebase/app");
// eslint-disable-next-line no-unused-vars
import "firebase/firestore";

// firebase config
var config = {
  apiKey: "AIzaSyDB8vnIw7pEXPonBa0Ni9Qvkf5vOMYUVP4",
  authDomain: "todolist-2558d.firebaseapp.com",
  databaseURL: "https://todolist-2558d.firebaseio.com",
  projectId: "todolist-2558d",
  storageBucket: "todolist-2558d.appspot.com",
  messagingSenderId: "19040480521",
  appId: "1:19040480521:web:647a7c7913c5ee369477d8",
  measurementId: "G-6DVRE46G75",
};

// Initialize Firebase
// eslint-disable-next-line
const firestore = firebase.initializeApp(config);
const db = firebase.firestore();
export default db;
