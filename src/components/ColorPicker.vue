<template>
  <v-card>
    <v-card-title>Pick a color:</v-card-title>
    <v-color-picker
      v-model="newColor"
      mode="hexa"
      align-center
      hide-inputs
      hide-canvas
      show-swatches
      flat
    ></v-color-picker>

    <v-card-actions>
      <v-btn @click="saveColor" icon>
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="close" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ColorPicker",
  data: () => ({
    newColor: "",
  }),
  methods: {
    saveColor() {
      this.$store.dispatch("changeTitleColor", this.newColor);
    },
    close() {
      this.$store.commit("toggleColorPicker");
    },
  },
};
</script>

<style></style>
