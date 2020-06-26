import db from "@/firebase/init";
import router from "../router";
import firebase from "firebase";

export default {
  addItem(state) {
    if (!state.newItem) {
      return;
    }
    state.todo.push({
      text: state.newItem,
      done: false,
      dateAdded: state.currentTime,
      dateCompleted: "",
      img: ""
    });
    state.newItem = "";
  },
  addCompletionDate(state, index) {
    if (state.todo[index].done) {
      state.todo[index].dateCompleted = state.currentTime;
    } else {
      state.todo[index].dateCompleted = "";
    }
    console.log(state.todo[index].dateCompleted);
  },
  removeItem(state, index) {
    let url = state.todo[index].img;
    try {
      //removes everything but the file name from URL
      //found here: https://stackoverflow.com/questions/511761/js-function-to-get-filename-from-url
      let name = url
        ? url
            .split("/")
            .pop()
            .split("#")
            .shift()
            .split("?")
            .shift()
        : null;

      let storagePath = firebase.storage().ref();
      storagePath
        .child(`${name}`)
        .delete()
        .then()
        .catch(error => {
          state.imgError = error.message;
        });
      state.todo[index].img = null;
      state.imgError = "";
      state.todo.splice(index, 1);
    } catch (error) {
      state.imgError = error.message;
    }
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
  saveTitle(state) {
    if (state.existingList) {
      let ref = db.collection("todos");
      state.saving = true;
      ref
        .doc(state.todoListID)
        .update({
          name: state.todoName
        })
        .then(() => {
          state.saving = false;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return;
    }
  },
  saveListItems(state) {
    state.saving = true;
    let ref = db.collection("todos");
    ref
      .doc(state.todoListID)
      .update({
        todo: JSON.stringify(state.todo)
      })
      .then(() => {
        state.saving = false;
      })
      .catch(err => {
        console.log(err);
        state.saving = false;
      });
  },
  saveThemeColor(state) {
    state.saving = true;
    let ref = db.collection("todos");
    ref
      .doc(state.todoListID)
      .update({
        titleColor: state.titleColor
      })
      .then(() => {
        state.saving = false;
      })
      .catch(err => {
        console.log(err);
        state.saving = false;
      });
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
          titleColor: state.titleColor
        })
        .then(() => {
          state.saving = false;
        })
        .catch(err => {
          console.log(err);
          state.saving = false;
        });
    } else {
      ref
        .doc(listID)
        .set({
          ID: listID,
          name: state.todoName,
          todo: JSON.stringify(state.todo),
          titleColor: state.titleColor
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
  toggleUploadDialog(state) {
    state.uploadDialog = !state.uploadDialog;
  },
  toggleViewImageDialog(state) {
    state.viewImg = !state.viewImg;
  },
  checkIfFirstTime(state) {
    var token = localStorage.getItem("firstTimeToken");
    if (token == "Not your first time eh?") {
      state.infoPanel = false;
    } else {
      state.infoPanel = true;
      localStorage.setItem("firstTimeToken", "Not your first time eh?");
    }
  },
  setListIndex(state, i) {
    state.listIndex = i;
  },
  getNow(state) {
    const today = new Date();

    const date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    state.currentTime = date;
  },
  toggleAccountPanel(state) {
    state.accountPanel = !state.accountPanel;
  },
  saveListLink(state) {
    //ensures array exists before saving
    state.savedLinks = state.savedLinks || [];
    let link = "https:/" + "/todol.ink/" + state.todoListID;
    state.savedLinks.push(link);
    let dataPack = JSON.stringify(state.savedLinks);
    localStorage.setItem("savedLinks", dataPack);
  },
  deleteListLink(state, i) {
    state.savedLinks.splice(i, 1);
    let dataPack = JSON.stringify(state.savedLinks);
    localStorage.setItem("savedLinks", dataPack);
  },
  attachImage(state, url) {
    state.todo[state.listIndex].img = url;
  },
  deleteImg(state) {
    let url = state.todo[state.listIndex].img;
    try {
      //removes everything but the file name from URL
      //found here: https://stackoverflow.com/questions/511761/js-function-to-get-filename-from-url
      let name = url
        ? url
            .split("/")
            .pop()
            .split("#")
            .shift()
            .split("?")
            .shift()
        : null;

      let storagePath = firebase.storage().ref();
      storagePath
        .child(`${name}`)
        .delete()
        .then()
        .catch(error => {
          state.imgError = error.message;
        });
      state.todo[state.listIndex].img = null;
    } catch (error) {
      state.imgError = error.message;
    }
  }
};
