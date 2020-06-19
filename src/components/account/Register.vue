<template>
  <v-card class="px-5 py-5" flat>
    <v-form>
      <v-flex>
        <v-col>
          <v-row>
            <v-text-field label="Username"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field label="Email"></v-text-field>
          </v-row>
        </v-col>

        <v-row>
          <v-col>
            <v-text-field label="Password"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Repeat Password"></v-text-field>
          </v-col>
        </v-row>
      </v-flex>
    </v-form>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text>Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Register",
  data: () => ({}),
};
</script>

<style></style>
