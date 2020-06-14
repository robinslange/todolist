<template>
  <v-footer absolute padless tile color="white">
    <v-card class="flex" flat>
      <v-card-text class="text-center">
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
            <v-icon>fa-globe</v-icon>
          </a>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footerButton {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.54);
}
</style>
