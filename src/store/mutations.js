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
      dateAdded: state.currentTime,
    });
    state.newItem = "";
    console.log(state.todo);
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
  toggleInfoPanel(state) {
    state.infoPanel = !state.infoPanel;
  },
  checkIfFirstTime(state) {
    var token = localStorage.getItem("firstTimeToken");
    if (token != null) {
      state.infoPanel = false;
    } else {
      state.infoPanel = true;
      localStorage.setItem("firstTimeToken", "Not your first visit!");
    }
  },
  getNow(state) {
    const today = new Date();

    const date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    //const time =
    //today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //const dateTime = date + " " + time;
    state.currentTime = date;
  },
  toggleAccountPanel(state) {
    state.accountPanel = !state.accountPanel;
  },
  toggleAutoSave(state, val) {
    state.autoSave = val;
  },
  saveListLink(state) {
    let link = "https:/" + "/todol.ink/" + state.todoListID;
    console.log(link);
    state.savedLinks.push(link);
    console.log();
    let dataPack = JSON.stringify(state.savedLinks);
    localStorage.setItem("savedLinks", dataPack);
  },
};
