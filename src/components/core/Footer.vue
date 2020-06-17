<template>
  <v-footer fixed padless tile color="white">
    <v-card class="flex" flat>
      <v-card-text class="text-center">
        <v-list-item two-line v-if="this.$store.state.todoListID">
          <v-list-item-content>
            <v-list-item-title>Your shareable link: </v-list-item-title>
            <v-list-item-subtitle>
              <span class="fullSelect">
                https://todol.ink/{{ this.$store.state.todoListID }}
              </span>
              <v-btn @click="copy" tile small icon>
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item v-if="!this.$store.state.todoListID" two-line
            >Share Us!</v-list-item
          >
        </v-list-item>

        <v-snackbar
          v-model="copied"
          :timeout="timeout"
          align="center"
          justify="center"
          transition="fade-transition"
          centered
        >
          Copied!
        </v-snackbar>

        made with &nbsp; <v-icon>fa-heart</v-icon> &nbsp; by Robin Lange

        <v-btn icon>
          <a class="footerButton" href="https://github.com/robinslange">
            <v-icon>mdi-github</v-icon>
          </a>
        </v-btn>
        <v-btn icon>
          <a class="footerButton" href="https://twitter.com/_schwarte_">
            <v-icon>mdi-twitter</v-icon>
          </a>
        </v-btn>
        <v-btn icon>
          <a class="footerButton" href="https://robinlange.me">
            <v-icon>mdi-web</v-icon>
          </a>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    copied: false,
    timeout: 500,
  }),
  methods: {
    copy() {
      let item = "https:/" + "/todol.ink/" + this.$store.state.todoListID;
      this.copied = true;

      this.$copyText(item).then(
        function(e) {
          console.log("copied");
          console.log(e);
        },
        function(e) {
          console.log("not copied");
          console.log(e);
        }
      );
    },
  },
};
</script>

<style scoped>
.footerButton {
  text-decoration: none;
  color: inherit;
}
.snackbar {
  max-width: 50px !important;
}
.fullSelect {
  -webkit-user-select: all; /* Chrome 49+ */
  -moz-user-select: all; /* Firefox 43+ */
  -ms-user-select: all; /* No support yet */
  user-select: all; /* Likely future */
}
</style>
