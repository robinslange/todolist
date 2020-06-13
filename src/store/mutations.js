import db from "@/firebase/init";

export default {
  addItem(state) {
    if (!state.newItem) {
      return;
    }
    state.todo.push({
      text: state.newItem,
      done: false,
    });
    state.newItem = "";
  },
  removeItem(state, index) {
    state.todo.splice(index, 1);
  },
  makeid(state, length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    state.tempID = result;
  },
  saveList(state) {
    console.log("saving");
    let ref = db.collection("todos");
    let listID = state.tempID;
    state.saving = true;
    if (state.existingList) {
      ref
        .doc(state.todoListID)
        .update({
          name: state.todoName,
          todo: JSON.stringify(state.todo),
        })
        .then(() => {
          state.saving = false;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      ref
        .doc(listID)
        .set({
          ID: listID,
          name: state.todoName,
          todo: JSON.stringify(state.todo),
        })
        .then(() => {
          state.saving = false;
          state.todoListID = listID;
          state.existingList = true;
          this.$router.push("/" + listID);
        });
      console.log(listID);
      console.log("new list!");
      state.saving = false;
    }
  },
  toggleEditDialog(state) {
    state.editDialog = !state.editDialog;
  },
  renameList(state, newName) {
    state.editDialog = false;
    state.todoName = newName;
    console.log("renamed to: " + state.todoName);
  },
};
