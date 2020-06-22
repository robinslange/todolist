<template>
  <v-card class="px-5 py-5" flat>
    <v-form>
      <v-text-field
        v-model="email"
        label="Email"
        prepend-icon="mdi-email-outline"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        prepend-icon="mdi-lock"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
      ></v-text-field>
    </v-form>

    <v-card-actions>
      <v-btn @click="toggleResetDialog" text>Forgot Password</v-btn>
      <ForgotDialog />
      <SentDialog />
      <v-spacer></v-spacer>
      <v-btn @click="login" :loading="loggingIn" text>Login</v-btn>
    </v-card-actions>
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
  }),
  methods: {
    login() {
      this.loggingIn = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          let userRef = db.collection("users").doc(data.user.uid);
          userRef
            .get()
            .then((doc) => {
              if (!doc.exists) {
                console.log("no such document");
              } else {
                let data = doc.data();
                this.$store.commit("SET_USER_PREMIUM_STATUS", data.premium);
                this.$store.commit("SET_USER_ADMIN_STATUS", data.admin);
                //firebase.analytics().logEvent("login");
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
