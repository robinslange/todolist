import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader
import VueClipboard from "vue-clipboard2";
import VueSocialSharing from "vue-social-sharing";

Vue.config.productionTip = false;
Vue.use(VueClipboard);
Vue.use(VueSocialSharing);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
