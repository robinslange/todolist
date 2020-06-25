export default {
  saveList(context) {
    context.commit("makeid", 6);
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
  uploadImg(context, url) {
    context.commit("attachImage", url);
    context.commit("saveList");
  },
  deleteImg(context) {
    context.commit("deleteImg");
    context.commit("saveList");
  },
};
