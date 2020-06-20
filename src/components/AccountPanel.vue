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
      <v-card flat>
        <v-card-title>
          Your Saved Lists
          <v-spacer></v-spacer>
          <v-btn @click="saveListLink">Save current list</v-btn>
        </v-card-title>

        <v-card max-height="150px" class="scroll" flat>
          <v-list>
            <v-list-item
              v-for="(item, i) in this.$store.state.savedLinks"
              :key="i"
              style="align-items: center;"
            >
              <a :href="item">
                <v-btn icon>
                  <v-icon size="16">fa-external-link-alt</v-icon>
                </v-btn>
              </a>
              <v-list-item-title>
                <span class="fullSelect">{{ item }}</span>
              </v-list-item-title>
              <v-list-item-action>
                <v-btn @click="deleteSavedLink(i)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase";

export default {
  name: "AccountPanel",
  components: {
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
