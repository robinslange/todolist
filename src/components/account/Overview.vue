<template>
  <v-card flat>
    <v-card-subtitle>
      View your account details
      <v-spacer></v-spacer>
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-col>
      <v-list-item two-line>
        <v-list-item-title>Username: </v-list-item-title>
        <v-list-item-subtitle>{{ user.displayName }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-title>Email: </v-list-item-title>
        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
      </v-list-item>
    </v-col>
    <v-card-subtitle
      >If you've just made changes to your account you'll need to refresh the
      page to see these here</v-card-subtitle
    >
  </v-card>
</template>

<script>
export default {
  name: "Overview",
  data: () => ({}),
  methods: {},
  computed: {
    user() {
      return this.$store.state.user.data;
    },
  },
  created() {},
};
</script>

<style></style>
