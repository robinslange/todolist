<template>
  <v-dialog v-model="forgot" width="400" persistent>
    <v-card class="px-1 py-2">
      <v-card-title>
        Reset Password
        <v-spacer></v-spacer>
        <v-btn @click="close" icon>
          <v-icon>fa-times</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle class="px-6 py-3">
        Enter your email address below to get sent a password reset link:
      </v-card-subtitle>
      <v-list-item two-line>
        <v-list-item-title>
          <v-text-field label="Email Address" v-model="email"></v-text-field>
        </v-list-item-title>
      </v-list-item>
      <v-card-subtitle v-if="errMsg" color="error">
        {{ errMsg }}
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="sendReset"
          :loading="sending"
          :disabled="!enteredAnAddress"
          text
          >Send Reset Email</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase";
export default {
  name: "ForgotPassword",
  data: () => ({
    email: "",
    sending: false,
    errMsg: ""
  }),
  methods: {
    sendReset() {
      this.sending = true;
      var auth = firebase.auth();
      var email = this.email;
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          this.sending = false;
          this.email = "";
          this.$store.commit("toggleForgotPassword");
          this.$store.commit("toggleSentDialog");
        })
        .catch(err => {
          console.log(err);
          this.errMsg = err.message;
          this.sending = false;
        });
    },
    close() {
      this.$store.commit("toggleForgotPassword");
    }
  },
  computed: {
    enteredAnAddress() {
      if (this.email.length > 6) {
        return true;
      } else {
        return false;
      }
    },
    forgot() {
      return this.$store.state.forgotDialog;
    }
  }
};
</script>

<style></style>
