<template>
  <div>
    <v-dialog v-model="uploadImage" width="400" @keyup.esc="close">
      <v-card>
        <v-card-title class="mainHeading">Attach Image</v-card-title>
        <v-card-subtitle class="subHeading">
          Feature Coming Soon
        </v-card-subtitle>
        <v-card-text>
          <v-file-input accept="image/*" label="Upload Image"></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="upload">Upload</v-btn>
          <v-btn color="primary" text @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "UploadImage",
  props: ["uploadImage"],
  data: () => ({
    imageData: null,
  }),
  methods: {
    upload(val) {
      this.$emit("upload", val);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.subHeading {
  color: red !important;
  padding-top: 5px !important;
}
</style>
