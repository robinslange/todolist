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
        <h3 style="color:green;font-style:bold;display:inline;">NEW: </h3>Whenever you save
        a change, anyone else viewing the list will have their list updated automatically!
        <br />
        <br />
        If you have trouble with anything get in touch via one of the links in the footer :)
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
  },
};
</script>

<style scoped>
.todoLink {
  color: blue;
}
</style>
