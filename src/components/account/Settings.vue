<template>
  <v-card flat>
    <v-card-subtitle>Change your settings here</v-card-subtitle>
    <v-divider></v-divider>
    <v-col>
      <v-list-item two-line>
        <v-list-item-title>Username:</v-list-item-title>
        <v-list-item-subtitle>
          <v-text-field v-model="newUsername"></v-text-field>
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-title>Email:</v-list-item-title>
        <v-list-item-subtitle>
          <v-text-field v-model="newEmail"></v-text-field>
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-title>New Password:</v-list-item-title>
        <v-list-item-subtitle>
          <v-btn @click="sendEmail" :loading="sending" text>
            Send Password Reset Email
          </v-btn>
        </v-list-item-subtitle>
      </v-list-item>
    </v-col>
    <v-card-actions>
      <v-list-item two-line>
        <v-list-item-subtitle>
          <v-text-field
            v-model="password"
            label="Current Password"
            prepend-icon="mdi-lock"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
          ></v-text-field>
        </v-list-item-subtitle>
      </v-list-item>

      <v-spacer></v-spacer>
      <v-btn
        @click="updateDetails"
        :loading="updating"
        :disabled="passwordTyped"
        text
      >
        Update Details
      </v-btn>
    </v-card-actions>
    <v-card-subtitle v-if="errMsg" color="error">{{ errMsg }}</v-card-subtitle>
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Settings",
  data: () => ({
    updating: false,
    sending: false,
    show: false,
    newUsername: "",
    newEmail: "",
    newPassword: "",
    password: "",
    errMsg: "",
  }),
  methods: {
    updateDetails() {
      var user = firebase.auth().currentUser;
      // found solution to credential object here: https://stackoverflow.com/questions/37811684/how-to-create-credential-object-needed-by-firebase-web-user-reauthenticatewith
      var credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.password
      );
      if (this.newUsername.length > 0) {
        this.updateUsername(user);
      }
      if (this.newEmail.length > 0) {
        this.updateEmail(user, credential);
      }
    },
    updateEmail(user, credential) {
      this.updating = true;
      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          user
            .updateEmail(this.newEmail)
            .then(() => {
              this.updating = false;
              this.newEmail = "";
              this.errMsg = "";
              this.password = "";
            })
            .catch((err) => {
              //console.log(err);
              this.errMsg = err.message;
            });
        })
        .catch((err) => {
          //console.log(err);
          this.errMsg = err.message;
        });
    },
    updateUsername(user) {
      this.updating = true;
      user
        .updateProfile({
          displayName: this.newUsername,
        })
        .then(() => {
          this.updating = false;
          this.newUsername = "";
          this.errMsg = "";
        })
        .catch((err) => {
          //console.log(err);
          this.errMsg = err.message;
        });
    },
    sendEmail() {
      this.sending = true;
      var email = this.userCurrent.email;
      var auth = firebase.auth();

      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          this.sending = false;
        })
        .catch((err) => {
          this.errMsg = err.message;
        });
    },
  },
  computed: {
    userCurrent() {
      return this.$store.state.user.data;
    },
    passwordTyped() {
      if (this.password.length > 0) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style></style>
