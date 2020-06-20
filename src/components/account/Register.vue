<template>
  <v-card class="px-5 py-5" flat>
    <span>
      <v-form>
        <v-flex>
          <v-col>
            <v-row>
              <v-text-field
                v-model="username"
                label="Username"
                prepend-icon="mdi-account"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="email"
                label="Email"
                prepend-icon="mdi-email-outline"
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
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Repeat Password"
                v-model="rePassword"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
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

export default {
  name: "Register",
  data: () => ({
    show: false,
    show2: false,
    loggingIn: false,
    username: "",
    email: "",
    password: "",
  }),
  methods: {
    register() {
      this.loggingIn = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.username,
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
};
</script>

<style></style>
