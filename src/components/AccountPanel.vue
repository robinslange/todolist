<template>
  <v-dialog
    v-model="this.$store.state.accountPanel"
    max-width="450"
    max-height="350"
    persistent
  >
    <v-card>
      <v-card-title>
        Account
        <v-spacer></v-spacer>
        <v-card-actions v-if="loggedIn">
          <v-spacer></v-spacer>
          <v-btn @click="logOut" text>Log Out</v-btn>
        </v-card-actions>
        <v-btn @click="close" icon>
          <v-icon>fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-tabs v-if="!loggedIn">
        <v-tab>Login</v-tab>
        <v-tab-item>
          <Login />
        </v-tab-item>
        <v-tab>Register</v-tab>
        <v-tab-item>
          <Register />
        </v-tab-item>
      </v-tabs>
      <v-tabs v-if="loggedIn">
        <v-tab>Overview</v-tab>
        <v-tab-item>
          <Overview />
        </v-tab-item>
        <v-tab>Settings</v-tab>
        <v-tab-item>
          <Settings />
        </v-tab-item>
        <v-tab>Premium</v-tab>
        <v-tab-item>
          <Premium />
        </v-tab-item>
      </v-tabs>

      <v-divider></v-divider>
      <SavedLists />
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase";
import SavedLists from "@/components/account/SavedLists";

export default {
  name: "AccountPanel",
  components: {
    SavedLists,
    Login: () => import("@/components/account/Login"),
    Register: () => import("@/components/account/Register"),
    Overview: () => import("@/components/account/Overview"),
    Settings: () => import("@/components/account/Settings"),
    Premium: () => import("@/components/account/Premium"),
  },
  data: () => ({
    autoSave: false,
  }),
  methods: {
    toggleAutoSave() {
      this.$store.commit("toggleAutoSave", this.autoSave);
    },
    saveListLink() {
      this.$store.commit("saveListLink");
    },
    deleteSavedLink(i) {
      this.$store.commit("deleteListLink", i);
    },
    close() {
      this.$store.commit("toggleAccountPanel");
    },
    logOut() {
      let savedLinks = JSON.parse(localStorage.getItem("savedLinks"));
      this.$store.state.savedLinks = savedLinks;
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logged out");
        });
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.user.loggedIn;
    },
    onAList() {
      if (this.$store.state.todoListID) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.nowrap {
  white-space: nowrap;
}
.scroll {
  overflow-y: auto;
}
.fullSelect {
  -webkit-user-select: all; /* Chrome 49+ */
  -moz-user-select: all; /* Firefox 43+ */
  -ms-user-select: all; /* No support yet */
  user-select: all; /* Likely future */
}
</style>
