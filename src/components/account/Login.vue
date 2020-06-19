<template>
  <v-card class="px-5 py-5" flat>
    <v-form>
      <v-text-field
        label="Email"
        prepend-icon="mdi-email-outline"
      ></v-text-field>
      <v-text-field
        label="Password"
        prepend-icon="mdi-lock"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
      ></v-text-field>
    </v-form>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text>Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    show: false,
  }),
  methods: {
      login() {
          this.$store.commit("doLogin");
      }
  }
};
</script>

<style></style>
