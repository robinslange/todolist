<template>
  <v-card class="px-5 py-5" flat>
    <span>
      <v-form ref="register">
        <v-flex>
          <v-col>
            <v-row>
              <v-text-field
                v-model="username"
                label="Username"
                prepend-icon="mdi-account"
                :rules="[
                  this.$store.state.rules.required,
                  this.$store.state.rules.counterMin3,
                ]"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="email"
                label="Email"
                prepend-icon="mdi-email-outline"
                :rules="[
                  this.$store.state.rules.required,
                  this.$store.state.rules.email,
                ]"
              ></v-text-field>
            </v-row>
          </v-col>

          <v-row>
            <v-col>
              <v-text-field
                label="Password"
                v-model="password"
                prepend-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                :rules="[
                  this.$store.state.rules.required,
                  this.$store.state.rules.counterMin3,
                  passwordConfirmationRule,
                ]"
              ></v-text-field>
            </v-col>
            <v-col>
              <!-- 
                //TODO: check if passwords match and other validation
              -->
              <v-text-field
                label="Repeat Password"
                v-model="rePassword"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                :rules="[
                  this.$store.state.rules.required,
                  this.$store.state.rules.counterMin3,
                  passwordConfirmationRule,
                ]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-flex>
        <p v-if="error" color="error">{{ error }}</p>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="register" :loading="loggingIn" text>Register</v-btn>
      </v-card-actions>
    </span>
  </v-card>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "Register",
  data: () => ({
    show: false,
    show2: false,
    loggingIn: false,
    username: "",
    email: "",
    password: "",
    rePassword: "",
    valid: false,
  }),
  methods: {
    validate() {
      this.valid = this.$refs.register.validate();
    },
    register() {
      this.validate();
      if (!this.valid) return;
      this.loggingIn = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.updateProfile({
            displayName: this.username.toString(),
          });
          db.collection("users")
            .doc(data.user.uid)
            .set({
              premium: false,
              admin: false,
              syncedLists: "",
            })
            .then(() => {})
            .catch((err) => {
              console.log(err);
              this.error = err.message;
            })
            .then(() => {
              this.loggingIn = false;
              //clear register form
              //hide register tab
              //close register form and change state to loggedIn
              //working from: https://blog.logrocket.com/vue-firebase-authentication/
            });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
  computed: {
    passwordConfirmationRule() {
      return this.password === this.rePassword || "Password must match";
    },
  },
};
</script>

<style></style>
