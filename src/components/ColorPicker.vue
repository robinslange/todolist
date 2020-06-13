<template>
  <v-dialog v-model="this.$store.state.colorPickerDialog" width="400">
    <v-card>
      <v-card-title>Choose a color:</v-card-title>
      <v-col>
        <v-flex class="align-center">
          <v-color-picker
            v-model="newColor"
            mode="hexa"
            align-center
            hide-inputs
          ></v-color-picker>
        </v-flex>
      </v-col>
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
    type: "hex",
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
