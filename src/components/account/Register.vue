<template>
  <v-card class="px-5 py-5" flat>
    <v-form>
      <v-flex>
        <v-col>
          <v-row>
            <v-text-field
              label="Username"
              prepend-icon="mdi-account"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
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
  data: () => ({
    show: false,
    show2: false,
  }),
};
</script>

<style></style>
