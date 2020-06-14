import db from "@/firebase/init";
import router from "../router";

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
    let ref = db.collection("todos");
    let listID = state.tempID;
    state.saving = true;
    if (state.existingList) {
      ref
        .doc(state.todoListID)
        .update({
          name: state.todoName,
          todo: JSON.stringify(state.todo),
          titleColor: state.titleColor,
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
          titleColor: state.titleColor,
        })
        .then(() => {
          state.saving = false;
          state.todoListID = listID;
          state.existingList = true;
          router.push("/" + listID);
        });

      state.saving = false;
    }
  },
  toggleEditDialog(state) {
    state.editDialog = !state.editDialog;
  },
  renameList(state, newName) {
    state.editDialog = false;
    state.todoName = newName;
  },
  toggleColorPicker(state) {
    state.colorPickerDialog = !state.colorPickerDialog;
  },
  changeTitleColor(state, newColor) {
    state.titleColor = newColor;
  },
  toggleNameEdit(state) {
    state.notEditing = !state.notEditing;
  },
  saveNewName(state, newName) {
    state.todoName = newName;
    state.notEditing = true;
  },
};
