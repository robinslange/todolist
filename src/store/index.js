import Vue from "vue";
import Vuex from "vuex";
import state from "./state.js";
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
import modules from "./modules.js";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [
  //   createPersistedState({
  //     storage: window.sessionStorage,
  //   }),
  // ],
  state,
  mutations,
  actions,
  getters,
  modules,
});
