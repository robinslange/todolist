import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueClipboard from "vue-clipboard2";
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader
import titleMixin from "@/mixins/titleMixins";

Vue.config.productionTip = false;

Vue.mixin(titleMixin);

Vue.use(VueClipboard);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
