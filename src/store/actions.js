import state from "./state";

export default {
  saveList(context) {
    if (!state.existingList) context.commit("makeid", 6);
    context.commit("saveList");
  },
  changeTitleColor(context, newColor) {
    context.commit("changeTitleColor", newColor);
    context.commit("toggleColorPicker");
  },
  addToList(context) {
    context.commit("getNow");
    context.commit("addItem");
  },
  fetchUser({ commit }, user) {
    commit("SET_LOGGED_IN", user !== null);
    if (user) {
      commit("SET_USER", {
        displayName: user.displayName,
        email: user.email,
      });
    } else {
      commit("SET_USER", null);
    }
  },
};
