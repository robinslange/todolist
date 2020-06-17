<template>
  <v-app>
    <v-content>
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
            <v-card v-else class="elevation-6" max-height="500">
              <v-toolbar :color="this.$store.state.titleColor" dark flat>
                <v-form
                  v-if="!this.$store.state.notEditing"
                  ref="editName"
                  dark
                >
                  <v-text-field
                    v-model="newTodoName"
                    class="py-2 editNameBox"
                    :value="this.$store.state.todoName"
                    :rules="[
                      this.$store.state.rules.counterMax25,
                      this.$store.state.rules.counterMin3,
                    ]"
                    persistent-hint
                    dark
                    clearable
                    autofocus
                    @keypress.enter.prevent="saveName"
                  >
                  </v-text-field>
                </v-form>
                <v-toolbar-title v-if="this.$store.state.notEditing">
                  <span class="py-2">
                    {{ this.$store.state.todoName }}
                  </span>
                </v-toolbar-title>
                <v-progress-linear
                  :active="this.$store.state.todo.length > 0"
                  :value="progress"
                  color="success"
                  absolute
                  bottom
                ></v-progress-linear>

                <v-btn
                  @click="toggleEditName"
                  v-if="this.$store.state.notEditing"
                  icon
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="saveName" v-else icon>
                  <v-icon>fa-check</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <span v-if="this.$store.state.todo.length > 0">
                  <v-progress-circular
                    v-if="this.$store.state.saving"
                    class="save"
                    indeterminate
                  ></v-progress-circular>
                  <v-btn @click="saveList" v-else icon>
                    <v-icon>fa-save</v-icon>
                  </v-btn>
                </span>
              </v-toolbar>

              <v-col>
                <v-row class="px-4">
                  <v-text-field
                    label="What do you need to get done?"
                    v-model="newItem"
                    @keyup.enter="addItem"
                  >
                    <v-icon slot="append" color="primary" @click="addItem">
                      mdi-plus
                    </v-icon>
                  </v-text-field>
                </v-row>
              </v-col>

              <v-card flat class="scroll" max-height="300">
                <v-col>
                  <v-list v-if="this.$store.state.todo">
                    <v-list-item
                      two-line
                      v-for="(item, index) in this.$store.state.todo"
                      :key="index"
                    >
                      <v-list-item-avatar>
                        <v-checkbox v-model="item.done"></v-checkbox>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="wrap-text">
                          {{ item.text }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          Date Added: {{ item.dateAdded }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <!-- <v-btn icon>
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn> -->
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
                      <!-- 
                      //TODO: implement image attach 
                    -->
                      <!-- <v-btn
                      icon
                      ripple
                      color="primary"
                      @click="toggleUploadDialog"
                      @close="toggleUploadDialog"
                      @sendImage="uploadImageFunc"
                    >
                      <v-icon>mdi-file-upload-outline</v-icon>
                    </v-btn> -->
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-speed-dial
      v-model="options"
      direction="top"
      transition="scale-transition"
      class="my-12 mx-2"
      open-on-hover
      fixed
      bottom
      right
    >
      <template v-slot:activator>
        <v-btn v-model="options" fab>
          <v-icon v-if="options">fa-times</v-icon>
          <v-icon v-else>fa-cog</v-icon>
        </v-btn>
      </template>

      <v-btn @click="toggleColorPicker" fab small>
        <v-icon>fa-paint-brush</v-icon>
      </v-btn>
      <v-btn v-if="darkMode" @click="turnOnDarkMode" fab small>
        <v-icon>fa-moon</v-icon>
      </v-btn>
      <v-btn v-if="!darkMode" @click="turnOffDarkMode" fab small>
        <v-icon>fa-sun</v-icon>
      </v-btn>
    </v-speed-dial>
    <Footer />
    <UploadImage
      :uploadImage="uploadImage"
      @close="toggleUploadDialog"
      @upload="uploadImage"
    />
    <ColorPicker />
    <InfoPanel />
    <AccountPanel />
  </v-app>
</template>

<script>
import db from "@/firebase/init";

export default {
  title: "",
  name: "Index",
  components: {
    Footer: () => import("@/components/core/Footer"),
    UploadImage: () => import("@/components/UploadImage"),
    ColorPicker: () => import("@/components/ColorPicker"),
    InfoPanel: () => import("@/components/InfoPanel"),
    AccountPanel: () => import("@/components/AccountPanel"),
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
      darkMode: true,
    };
  },
  methods: {
    addItem() {
      this.$store.state.newItem = this.newItem;
      this.$store.dispatch("addToList");
      this.newItem = "";
    },
    removeTodo(index) {
      this.$store.commit("removeItem", index);
    },
    saveList() {
      this.$store.dispatch("saveList");
    },
    saveName() {
      this.valid = this.$refs.editName.validate();
      if (this.valid) {
        this.$store.commit("saveNewName", this.newTodoName);
      }
    },
    toggleEditName() {
      this.$store.commit("toggleNameEdit");
    },
    toggleUploadDialog() {
      this.uploadImage = !this.uploadImage;
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
            let queryRef = db
              .collection("todos")
              .where("ID", "==", this.$route.params.id);
            queryRef
              .get()
              .then((snapshot) => {
                // found solution to forever loading if non-existtant query here under (readonly) query :Query:
                // https://googleapis.dev/nodejs/firestore/latest/QuerySnapshot.html
                if (!snapshot.empty) {
                  this.$store.state.existingList = true;
                  snapshot.forEach((doc) => {
                    let data = doc.data();
                    let list = JSON.parse(data.todo);
                    for (let i = 0; i < snapshot.size; i++) {
                      this.$store.state.todo = list;
                      this.$store.state.todoName = data.name;
                      this.newTodoName = data.name;
                      this.$store.state.todoListID = data.ID;
                      this.$store.state.titleColor = data.titleColor;
                      this.$store.state.loading = false;
                    }
                  });
                  //if router params doesn't exist
                } else {
                  //send to default route
                  this.$router.push("/");
                  //stop loading
                  this.$store.state.loading = false;
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.$store.state.loading = false;
          }
        });
      });
    },
  },
  computed: {
    completedTasks() {
      return this.$store.state.todo.filter((todo) => todo.done).length;
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
  },

  mounted() {
    window.setInterval(() => {
      if (this.$store.state.autoSave) {
        this.saveList();
      }
    }, 30000);
  },
  created() {
    this.$store.commit("checkIfFirstTime");
    let savedLinks = JSON.parse(localStorage.getItem("savedLinks"));
    this.$store.state.savedLinks = savedLinks;
    this.$store.state.loading = true;
    this.pullDataAsync()
      .then()
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
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
