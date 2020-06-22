<template>
  <v-dialog v-model="this.$store.state.viewImg" width="400" persistent>
    <v-card class="px-2 py-2">
      <v-card-title>
        {{ this.$store.state.todo[selectedIndex].text }}
        <v-spacer></v-spacer>
        <v-btn @click="close" icon>
          <v-icon>fa-times</v-icon>
        </v-btn>
      </v-card-title>
      <v-progress-linear v-if="!loaded" indeterminate></v-progress-linear>
      <v-img
        max-width="400"
        max-height="400"
        :src="imgSrc"
        @load="loaded = true"
      ></v-img>
      <v-card-actions>
        <v-btn @click="deleteImg" text>Delete Image</v-btn>
        <a :href="imgSrc" target="_blank">
          <v-btn text>View Full Size</v-btn>
        </a>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ViewImage",
  data: () => ({
    loaded: false,
  }),
  methods: {
    close() {
      this.$store.commit("toggleViewImageDialog");
    },
    deleteImg() {
      this.$store.dispatch("deleteImg");
      this.$store.commit("toggleViewImageDialog");
    },
  },
  computed: {
    imgSrc() {
      return this.$store.state.todo[this.selectedIndex].img;
    },
    selectedIndex() {
      return this.$store.state.listIndex;
    },
  },
};
</script>

<style></style>
