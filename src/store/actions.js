import state from "./state";

export default {
  saveList(context) {
    if (!state.existingList) context.commit("makeid", 6);
    context.commit("saveList");
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
  uploadImg(context, url) {
    context.commit("attachImage", url);
    context.commit("saveListItems");
  },
  deleteImg(context) {
    context.commit("deleteImg");
    context.commit("saveListItems");
  }
};
