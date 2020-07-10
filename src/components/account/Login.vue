<template>
  <v-card class="px-5 py-5" flat>
    <v-form ref="login">
      <v-text-field
        v-model="email"
        label="Email"
        prepend-icon="mdi-email-outline"
        :rules="[
          this.$store.state.rules.required,
          this.$store.state.rules.email,
        ]"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        prepend-icon="mdi-lock"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        :rules="[this.$store.state.rules.required]"
      ></v-text-field>
    </v-form>

    <v-card-actions>
      <v-btn @click="toggleResetDialog" text>Forgot Password</v-btn>
      <ForgotDialog />
      <SentDialog />
      <v-spacer></v-spacer>
      <v-btn @click="login" :loading="loggingIn" text>Login</v-btn>
    </v-card-actions>
    <v-card-subtitle v-if="error">
      {{ error }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  components: {
    ForgotDialog: () => import("@/components/account/dialogs/ResetPassword"),
    SentDialog: () => import("@/components/account/dialogs/SentDialog"),
  },
  name: "Login",
  data: () => ({
    show: false,
    email: "",
    password: "",
    loggingIn: false,
    valid: false,
  }),
  methods: {
    validate() {
      this.valid = this.$refs.login.validate();
    },
    login() {
      this.validate();
      if (!this.valid) return;
      this.loggingIn = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.$store.state.user.uid = data.user.uid;
          let userRef = db.collection("users").doc(data.user.uid);
          userRef
            .get()
            .then((doc) => {
              if (!doc.exists) {
                this.error =
                  "A record for this user does not exist, please contact the developer!";
              } else {
                let data = doc.data();
                this.$store.commit("SET_USER_PREMIUM_STATUS", data.premium);
                this.$store.commit("SET_USER_ADMIN_STATUS", data.admin);
                firebase.analytics().logEvent("login");
                let syncedListsTemp = JSON.parse(data.syncedLists);
                this.$store.commit("retrieveSyncedLists", syncedListsTemp);
                this.$store.state.reloadVariable++;
              }
            })
            .catch((err) => {
              this.error = err.message;
            });
          this.loggingIn = false;
        })
        .catch((err) => {
          this.loggingIn = false;
          this.error = err.message;
        });
    },
    toggleResetDialog() {
      this.$store.commit("toggleForgotPassword");
    },
  },
  computed: {
    userCurrent() {
      return this.$store.state.user.data;
    },
  },
};
</script>

<style></style>
