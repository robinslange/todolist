<template>
  <v-dialog v-model="this.$store.state.infoPanel" max-width="500" persistent>
    <v-card>
      <v-card-title>How do I use this?</v-card-title>
      <v-card-text>
        <span class="todoLink">Todol.ink </span>is designed to be simple. So
        here's all that you need to know:
        <ol>
          <li>Write your todo list</li>
          <li>
            At the bottom of the page is now your unique URL that you can share
            with anyone
          </li>
        </ol>
        <br />
        <span style="color: green; font-style: oblique;">NEW:</span> Accounts!
        Check out the whole new accounts panel with this button
        <v-btn @click="viewAccount" icon>
          <v-icon>fa-user</v-icon>
        </v-btn>
        or you can find it in the top left at any time :)
        <br />
        <br />
        Lists will automatically sync changes made by anyone viewing it.
        <br />
        <br />
        Ready to go? Press the button below to get started!
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close" text>Ready!</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "InfoPanel",
  data: () => ({}),
  methods: {
    close() {
      this.$store.commit("toggleInfoPanel");
    },
    viewAccount() {
      this.$store.commit("toggleInfoPanel");
      this.$store.commit("toggleAccountPanel");
    },
  },
};
</script>

<style scoped>
.todoLink {
  color: blue;
}
</style>
