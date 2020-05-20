import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

import firebase from "firebase";
require("firebase/firestore");

// firebase config
var firebaseConfig = {
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
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.prototype.$firebase = firebase;

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
