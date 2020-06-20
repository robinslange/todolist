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
      <v-spacer></v-spacer>
      <v-btn @click="login" text>Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data: () => ({
    show: false,
    email: "",
    password: "",
  }),
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
            //can put (data) above
          this.$state.store.loggedIn = true;
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>

<style></style>
