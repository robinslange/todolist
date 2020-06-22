import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@stripe/stripe-js";
//import db from "./firebase/init";
import * as firebase from "firebase";
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader
import VueClipboard from "vue-clipboard2";
import VueSocialSharing from "vue-social-sharing";

Vue.config.productionTip = false;
//Vue.config.performance = true;
Vue.use(VueClipboard);
Vue.use(VueSocialSharing);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
