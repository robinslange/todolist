<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <v-btn
          class="mx-5 my-12"
          @click="toggleAccountPanel"
          small
          fab
          top
          left
          absolute
          icon
        >
          <v-icon>fa-user</v-icon>
        </v-btn>

        <v-btn
          class="mx-5 my-12"
          @click="toggleInfoPanel"
          small
          fab
          top
          right
          absolute
          icon
        >
          <v-icon>fa-question</v-icon>
        </v-btn>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5">
            <v-layout v-if="this.$store.state.loading" justify-center>
              <v-progress-linear
                color="primary"
                class="align-center justify-center"
                indeterminate
              ></v-progress-linear>
            </v-layout>
            <div v-if="!this.$store.state.loading">
              <v-card class="px-3 py-3" elevation="3" shaped>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <h2 v-if="this.$store.state.notEditing">
                        {{ this.$store.state.todoName }}
                      </h2>
                    </v-list-item-title>
                    <v-text-field
                      v-if="!this.$store.state.notEditing"
                      v-model="newTodoName"
                      @keypress.enter.prevent="saveName"
                      autofocus
                      clearable
                    ></v-text-field>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon
                      v-if="this.$store.state.notEditing"
                      @click="toggleEditName"
                    >
                      fa-pencil-alt
                    </v-icon>
                    <v-icon @click="saveName" v-else>fa-check</v-icon>
                  </v-list-item-action>
                </v-list-item>

                <v-progress-linear
                  v-if="completedTasks > 0"
                  :value="progress"
                  :color="this.$store.state.titleColor"
                ></v-progress-linear>
                <v-progress-linear
                  v-else
                  value="100"
                  :color="this.$store.state.titleColor"
                ></v-progress-linear>
                <v-divider></v-divider>
                <v-col>
                  <v-row class="px-4">
                    <v-text-field
                      label="What do you need to get done?"
                      v-model="newItem"
                      @keyup.enter="addItem"
                    >
                      <v-icon slot="append" @click="addItem" size="20">
                        fa-plus
                      </v-icon>
                    </v-text-field>
                  </v-row>
                </v-col>
                <v-card flat class="scroll" max-height="200">
                  <v-col>
                    <v-list v-if="this.$store.state.todo">
                      <v-list-item
                        two-line
                        v-for="(item, index) in this.$store.state.todo"
                        :key="index"
                      >
                        <v-list-item-avatar>
                          <v-checkbox
                            v-model="item.done"
                            :color="themeColor"
                          ></v-checkbox>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="wrap-text">
                            {{ item.text }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            Date Added: {{ item.dateAdded }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-btn
                          @click="toggleUploadDialog(index)"
                          v-if="!item.img"
                          icon
                        >
                          <v-icon>fa-upload</v-icon>
                        </v-btn>
                        <v-btn
                          @click="toggleViewImageDialog(index)"
                          v-else
                          icon
                        >
                          <v-icon>fa-image</v-icon>
                        </v-btn>
                        <v-scroll-x-transition>
                          <v-btn
                            icon
                            ripple
                            color="red"
                            v-if="item.done"
                            @click="removeTodo(index)"
                          >
                            <v-icon class="red--text">mdi-close</v-icon>
                          </v-btn>
                        </v-scroll-x-transition>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-card>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-btn
        v-if="darkMode"
        @click="turnOnDarkMode"
        small
        fab
        bottom
        left
        fixed
        icon
        class="mx-5 my-12"
      >
        <v-icon>fa-moon</v-icon>
      </v-btn>
      <v-btn
        v-if="!darkMode"
        @click="turnOffDarkMode"
        small
        fab
        bottom
        left
        fixed
        icon
        class="mx-5 my-12"
      >
        <v-icon>fa-sun</v-icon>
      </v-btn>
      <v-menu
        transition="scale-transition"
        origin="bottom right"
        v-model="this.$store.state.colorPickerDialog"
        :close-on-content-click="false"
        class="mx-5 my-12"
        offset-overflow
        offset-y
        offset-x
        :nudge-left="300"
        absolute
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="toggleColorPicker"
            class="mx-5 my-12"
            v-bind="attrs"
            v-on="on"
            small
            fab
            bottom
            right
            fixed
            icon
          >
            <v-icon>fa-palette</v-icon>
          </v-btn>
        </template>
        <ColorPicker />
      </v-menu>
      <v-divider></v-divider>
    </v-main>

    <Footer />
    <UploadImage />
    <InfoPanel />
    <AccountPanel />
    <ViewImage />
  </v-app>
</template>

<script>
import db from "@/firebase/init";

export default {
  title: "",
  name: "Index",
  components: {
    Footer: () => import("@/components/core/Footer"),
    UploadImage: () => import("@/components/account/dialogs/UploadImage"),
    ViewImage: () => import("@/components/account/dialogs/ViewImage"),
    ColorPicker: () => import("@/components/ColorPicker"),
    InfoPanel: () => import("@/components/InfoPanel"),
    AccountPanel: () => import("@/components/AccountPanel")
  },
  data() {
    return {
      newItem: "",
      newTodoName: this.$store.state.todoName,
      uploadImage: false,
      existingList: false,
      options: false,
      valid: false,
      autoSave: false,
      darkMode: true
    };
  },
  methods: {
    addItem() {
      this.$store.state.newItem = this.newItem;
      this.$store.dispatch("addToList");
      if (this.$store.state.existingList) this.$store.dispatch("saveList");
      if (!this.$store.state.existingList) this.$store.commit("saveListItems");
      this.newItem = "";
    },
    removeTodo(index) {
      this.$store.commit("removeItem", index);
      if (this.$store.state.existingList) this.$store.dispatch("saveList");
      if (!this.$store.state.existingList) this.$store.commit("saveListItems");
    },
    saveButton() {
      this.$store.commit("saveListItems");
    },
    saveList() {
      this.$store.dispatch("saveList");
    },
    saveName() {
      this.$store.commit("saveNewName", this.newTodoName);
      if (this.$store.state.existingList) this.$store.commit("saveTitle");
    },
    toggleEditName() {
      this.$store.commit("toggleNameEdit");
    },
    toggleUploadDialog(i) {
      this.$store.commit("setListIndex", i);
      this.$store.commit("toggleUploadDialog");
    },
    toggleViewImageDialog(i) {
      this.$store.commit("setListIndex", i);
      this.$store.state.imgError = "";
      this.$store.commit("toggleViewImageDialog");
    },
    toggleColorPicker() {
      this.$store.commit("toggleColorPicker");
    },
    uploadImageFunc(val) {
      console.log(val);
    },
    turnOnDarkMode() {
      this.$vuetify.theme.dark = true;
      this.darkMode = false;
    },
    turnOffDarkMode() {
      this.$vuetify.theme.dark = false;
      this.darkMode = true;
    },
    toggleInfoPanel() {
      this.$store.commit("toggleInfoPanel");
    },
    toggleAccountPanel() {
      this.$store.commit("toggleAccountPanel");
    },
    async pullDataAsync() {
      return new Promise(() => {
        setTimeout(() => {
          if (this.$route.params.id != null) {
            db.collection("todos")
              .doc(this.$route.params.id)
              .onSnapshot(doc => {
                let data = doc.data();
                if (!data) {
                  this.$router.push("/");
                  this.$store.state.loading = false;
                  return;
                }
                let list = JSON.parse(data.todo);
                this.$store.state.todo = list;
                this.$store.state.todoName = data.name;
                this.newTodoName = data.name;
                this.$store.state.todoListID = data.ID;
                this.$store.state.titleColor = data.titleColor;
                this.$store.state.loading = false;
                this.$store.state.existingList = true;
              });
          } else {
            this.$store.state.loading = false;
          }
        });
      });
    }
  },
  computed: {
    completedTasks() {
      return this.$store.state.todo.filter(todo => todo.done).length;
    },
    completedList() {
      return this.$store.state.todo.filter(todo => todo.done);
    },
    incompleteList() {
      return this.$store.state.todo.filter(todo => !todo.done);
    },
    reverseList() {
      let list = this.$store.state.todo;
      return list.reverse();
    },
    progress() {
      return (this.completedTasks / this.$store.state.todo.length) * 100;
    },
    remainingTasks() {
      return this.$store.state.todo.length - this.completedTasks;
    },
    totalTasks() {
      return this.$store.state.todo.length;
    },
    themeColor() {
      return this.$store.state.titleColor;
    },
    todoDone() {
      return this.$store.state.todo.done;
    }
  },
  created() {
    this.$store.commit("checkIfFirstTime");
    let savedLinks = JSON.parse(localStorage.getItem("savedLinks"));
    this.$store.state.savedLinks = savedLinks;
    this.$store.state.loading = true;
    this.pullDataAsync()
      .then()
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
html {
  overflow: hidden;
}
.autoSaveSwitch {
  position: absolute;
  padding-left: 2%;
}
.scroll {
  overflow-y: auto;
}
.wrap-text {
  -webkit-line-clamp: unset !important;
  white-space: normal;
}
</style>
