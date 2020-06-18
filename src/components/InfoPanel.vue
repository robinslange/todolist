<template>
  <v-dialog v-model="this.$store.state.infoPanel" max-width="500" persistent>
    <v-card>
      <v-card-title>How do I use this?</v-card-title>
      <v-card-text>
        <span class="todoLink">Todol.ink </span>is designed to be simple. So
        here's all that you need to know:
        <ol>
          <li>Write your todo list</li>
          <li>Save it with this button <v-icon>fa-save</v-icon></li>
          <li>
            At the bottom of the page is now your unique URL that you can share
            with anyone
          </li>
        </ol>
        <br />
        <span style="color: green; font-style: oblique;">NEW:</span> The list
        will now save after every entry, so you don't need to toggle auto-save
        anymore :)
        <br />
        <br />
        Just remember that changes will save from whoever saves to the list last
        (In future it will auto-sync new changes between users)
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
