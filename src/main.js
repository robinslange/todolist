import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import db from "./firebase/init";
import * as firebase from "firebase";
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader
import VueClipboard from "vue-clipboard2";
import VueSocialSharing from "vue-social-sharing";

Vue.config.productionTip = false;
//Vue.config.performance = true;
Vue.use(VueClipboard);
Vue.use(VueSocialSharing);
firebase.analytics();

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.state.user.uid = user.uid;
        let userRef = db.collection("users").doc(user.uid);
        userRef
          .get()
          .then((doc) => {
            let data = doc.data();
            this.$store.commit("SET_USER_PREMIUM_STATUS", data.premium);
            this.$store.commit("SET_USER_ADMIN_STATUS", data.admin);
            this.$store.state.user.premium = data.premium;
            this.$store.state.user.admin = data.admin;
            let syncedListsTemp = JSON.parse(data.syncedLists);
            this.$store.state.user.syncedLists = syncedListsTemp;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("user not logged in");
      }
    });
  },
}).$mount("#app");
