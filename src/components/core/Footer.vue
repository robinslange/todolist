<template>
  <v-footer fixed padless tile>
    <v-card class="flex" flat>
      <v-card-text class="text-center">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Your Todolink: </v-list-item-title>
            <v-list-item-subtitle>
              <span class="fullSelect">
                https://todol.ink/{{ this.$store.state.todoListID }}
              </span>
              <v-btn @click="copy" tile small icon>
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-snackbar
          v-model="copied"
          :timeout="500"
          align="center"
          justify="center"
          transition="fade-transition"
          centered
        >
          Copied!
        </v-snackbar>

        made with &nbsp;
        <v-icon :color="this.$store.state.titleColor">fa-heart</v-icon> &nbsp;
        by Robin Lange

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
  components: {},
  data: () => ({
    defaultURL: "https:/" + "/todol.ink",
    defaultScale: 2,
    copied: false,
    timeout: 500,
    url: this.currentURL,
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
  computed: {
    currentURL() {
      let url = "https:/" + "/todol.ink";
      if (!this.$store.state.todoListID) {
        return url;
      } else {
        return url + "/" + this.$store.state.todolistID;
      }
    },
    currentTitle() {
      if (this.$store.state.todo.length > 0) {
        return "Check out my todo list!";
      } else {
        return "Check out this simple todo list app that creates easily shareable links!";
      }
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
