import state from "./state";
//import firebase from "firebase";

export default {
  saveList(context) {
    if (!state.existingList) {
      //firebase.analytics().logEvent("created_list");
      context.commit("makeid", 6);
      context.commit("saveList")
    }
  },
  changeTitleColor(context, newColor) {
    context.commit("changeTitleColor", newColor);
    if (state.existingList) context.commit("saveThemeColor");
    context.commit("toggleColorPicker");
  },
  addToList(context) {
    context.commit("getNow");
    context.commit("addItem");
  },
  addToSyncedLists(context, index) {
    context.commit("addToSyncedLists", index);
    context.commit("saveSyncedLists");
  },
  deleteFromSyncedLists(context, index) {
    context.commit("deleteFromSyncedLists", index);
    context.commit("saveSyncedLists");
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
  uploadImg(context, url) {
    context.commit("attachImage", url);
    context.commit("saveListItems");
  },
  deleteImg(context) {
    context.commit("deleteImg");
    context.commit("saveListItems");
  },
};
