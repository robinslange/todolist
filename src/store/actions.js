import state from "./state";

export default {
  saveList(context) {
    context.commit("makeid", 6);
    console.log("id created" + state.tempID);
    context.commit("saveList");
  },
};
