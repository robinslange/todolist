<template>
  <v-dialog v-model="this.$store.state.colorPickerDialog" width="400">
    <v-card>
      <v-card-title>Pick a color</v-card-title>
      <v-container class="fill-width">
        <v-col>
          <v-flex class="align-center">
            <v-color-picker
              v-model="newColor"
              mode="hexa"
              align-center
              hide-inputs
              hide-canvas
              show-swatches
            ></v-color-picker>
          </v-flex>
        </v-col>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="saveColor" text>Confirm</v-btn>
        <v-btn @click="close" text>Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
