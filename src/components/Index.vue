<template>
  <v-app>
    <v-content>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" class="addItemBox">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-progress-circular
                  v-if="saving"
                  class="save"
                  indeterminate
                ></v-progress-circular>
                <v-tooltip v-if="!saving" bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large @click="saveList" v-on="on">
                      <v-icon>fa-save</v-icon>
                    </v-btn>
                  </template>
                  <span>Save List</span>
                </v-tooltip>
                <v-toolbar-title class="px-2 py-2">{{
                  todoName
                }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large @click="editNameFunc" v-on="on">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Edit Name</span>
                </v-tooltip>
              </v-toolbar>
              <EditName
                :editName="editName"
                @close="closeNameDialog"
                @renameList="rename"
              />
              <UploadImage
                :uploadImage="uploadImage"
                @close="toggleUploadDialog"
                @upload="uploadImage"
              />
              <v-col>
                <v-row class="px-4"
                  ><v-text-field
                    label="Add an item"
                    v-model="newItem"
                    @keyup.enter="addItem"
                  >
                    <v-icon slot="append" color="primary" @click="addItem"
                      >mdi-plus</v-icon
                    ></v-text-field
                  ></v-row
                ></v-col
              >
              <v-col class="mx-1">
                <v-layout v-if="loading" justify-center>
                  <v-progress-linear
                    color="primary"
                    class="align-center justify-center"
                    indeterminate
                  ></v-progress-linear>
                </v-layout>
                <v-list v-if="todo">
                  <v-list-item v-for="(item, index) in todo" :key="index">
                    <v-list-item-avatar>
                      <v-checkbox v-model="item.done"></v-checkbox>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title> {{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                    <v-btn
                      icon
                      ripple
                      color="primary"
                      @click="toggleUploadDialog"
                      @close="toggleUploadDialog"
                      @sendImage="uploadImageFunc"
                    >
                      <v-icon>mdi-file-upload-outline</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      ripple
                      color="red"
                      v-if="item.done"
                      @click="removeTodo(i)"
                    >
                      <v-icon class="red--text">mdi-close</v-icon>
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import EditName from "@/components/EditName";
import UploadImage from "@/components/UploadImage";
import db from "@/firebase/init";

export default {
  name: "Index",
  components: { EditName, UploadImage },
  data() {
    return {
      newItem: "",
      todo: [],
      todoName: "Todo List",
      editName: false,
      uploadImage: false,
      existingList: false,
      todoListID: "",
      loading: false,
      saving: false,
      day: this.todoDay(),
      date: new Date().getDate(),
      ord: this.nth(new Date().getDate()),
      year: new Date().getFullYear(),
    };
  },
  methods: {
    addItem() {
      if (!this.newItem) {
        return;
      }
      this.todo.push({
        text: this.newItem,
        done: false,
      });
      this.newItem = "";
    },
    removeTodo(index) {
      this.todo.splice(index, 1);
    },
    itemDone() {
      console.log("Item Done");
    },
    saveList() {
      let ref = db.collection("todos");
      let listID = this.makeid(6);
      if (this.existingList) {
        this.saving = true;
        ref
          .doc(this.todoListID)
          .update({
            name: this.todoName,
            todo: JSON.stringify(this.todo),
          })
          .then(() => {
            this.saving = false;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.saving = true;
        ref
          .doc(listID)
          .set({
            ID: listID,
            name: this.todoName,
            todo: JSON.stringify(this.todo),
          })
          .then(() => {
            this.saving = false;
            this.todoListID = listID;
            this.existingList = true;
            this.$router.push("/" + listID);
          });
        console.log(listID);
        console.log("new list!");
      }
    },
    todoDay() {
      var d = new Date();
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days[d.getDay()];
    },
    nth(d) {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    },
    editNameFunc() {
      this.editName = true;
    },
    toggleUploadDialog() {
      this.uploadImage = !this.uploadImage;
    },
    uploadImageFunc(val) {
      console.log(val);
    },
    closeNameDialog() {
      this.editName = false;
    },
    rename(newName) {
      console.log(newName);
      this.todoName = newName;
      this.editName = false;
    },
    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  created() {
    this.loading = true;
    if (this.$route.params.id != null) {
      this.todoListID = this.$route.params.id;
      let listID = this.todoListID.toString();
      console.log(listID);
      let ref = db.collection("todos");
      let queryRef = ref.where("ID", "==", listID);
      queryRef.get().then((snapshot) => {
        console.log("exists");
        this.existingList = true;
        snapshot.forEach((doc) => {
          let data = doc.data();
          console.log(data);
          let list = JSON.parse(data.todo);
          for (let i = 0; i < snapshot.size; i++) {
            this.todo = list;
            this.todoName = data.name;
            this.todoListID = data.ID;
            this.loading = false;
          }
        });
      });
    } else {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.save {
  padding-right: 5px !important;
}
</style>
