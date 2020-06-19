<template>
  <v-card class="px-5 py-5" flat>
    <v-form>
      <v-text-field label="Username" prepend-icon="mdi-account"></v-text-field>
      <v-text-field
        label="Password"
        prepend-icon="mdi-lock"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
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
  data: () => ({}),
};
</script>

<style></style>
