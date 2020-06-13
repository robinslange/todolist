<template>
  <v-app>
    <v-content>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" class="addItemBox">
            <v-layout v-if="this.$store.state.loading" justify-center>
              <v-progress-linear
                color="primary"
                class="align-center justify-center"
                indeterminate
              ></v-progress-linear>
            </v-layout>
            <v-card v-if="!this.$store.state.loading" class="elevation-6">
              <v-toolbar :color="this.$store.state.titleColor" dark flat>
                <v-toolbar-title class="py-2">
                  {{ this.$store.state.todoName }}
                </v-toolbar-title>
                <v-spacer></v-spacer>

                <v-progress-circular
                  v-if="this.$store.state.saving"
                  class="save"
                  indeterminate
                ></v-progress-circular>
              </v-toolbar>
              <EditName />
              <UploadImage
                :uploadImage="uploadImage"
                @close="toggleUploadDialog"
                @upload="uploadImage"
              />
              <ColorPicker />
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
              <v-col>
                <v-list v-if="this.$store.state.todo">
                  <v-list-item
                    v-for="(item, index) in this.$store.state.todo"
                    :key="index"
                  >
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
                      @click="removeTodo(index)"
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
    <v-speed-dial
      v-model="options"
      direction="top"
      transition="scale-transition"
      open-on-hover
      absolute
      bottom
      right
    >
      <template v-slot:activator>
        <v-btn v-model="options" dark fab>
          <v-icon v-if="options">fa-times</v-icon>
          <v-icon v-else>fa-cog</v-icon>
        </v-btn>
      </template>

      <v-btn @click="saveList" fab dark small>
        <v-icon>fa-save</v-icon>
      </v-btn>
      <v-btn @click="toggleEditNameDialog" fab dark small>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn @click="toggleColorPicker" fab dark small>
        <v-icon>fa-paint-brush</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-app>
</template>

<script>
import db from "@/firebase/init";

export default {
  title: "",
  name: "Index",
  components: {
    EditName: () => import("@/components/EditName"),
    UploadImage: () => import("@/components/UploadImage"),
    ColorPicker: () => import("@/components/ColorPicker"),
  },
  data() {
    return {
      newItem: "",
      uploadImage: false,
      existingList: false,
      options: false,
    };
  },
  methods: {
    addItem() {
      this.$store.state.newItem = this.newItem;
      this.$store.commit("addItem");
      this.newItem = "";
    },
    removeTodo(index) {
      this.$store.commit("removeItem", index);
    },
    saveList() {
      this.$store.dispatch("saveList");
    },
    toggleEditNameDialog() {
      this.$store.commit("toggleEditDialog");
      this.title = this.$store.state.todoName;
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
  },

  created() {
    this.$store.state.loading = true;
    if (this.$route.params.id != null) {
      this.$store.state.todoListID = this.$route.params.id;

      let queryRef = db
        .collection("todos")
        .where("ID", "==", this.$route.params.id);

      queryRef
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            this.$store.state.existingList = true;
            snapshot.forEach((doc) => {
              console.log(doc);
              let data = doc.data();
              console.log(data);
              let list = JSON.parse(data.todo);
              for (let i = 0; i < snapshot.size; i++) {
                this.$store.state.todo = list;
                this.$store.state.todoName = data.name;
                this.$store.state.todoListID = data.ID;
                this.$store.state.titleColor = data.titleColor;
                this.$store.state.loading = false;
              }
            });
          } else {
            this.$store.state.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.$store.state.loading = false;
    }
  },
};
</script>

<style scoped></style>
