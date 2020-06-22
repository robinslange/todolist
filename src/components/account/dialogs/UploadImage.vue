<template>
  <v-dialog v-model="this.$store.state.uploadDialog" width="300" persistent>
    <v-card>
      <v-card-title>
        Attach Image
        <v-spacer></v-spacer>
        <v-btn @click="close" icon>
          <v-icon>fa-times</v-icon>
        </v-btn>
        <v-progress-linear
          v-if="this.img"
          :value="uploadValue"
        ></v-progress-linear>
      </v-card-title>
      <v-list-item two-line>
        <v-file-input
          accept="image/*"
          width="200"
          v-model="img"
          :rules="rules"
          :error-messages="error"
          clearable
        >
        </v-file-input>
      </v-list-item>
      <v-card-subtitle>Supports file sizes up to 2MB</v-card-subtitle>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="uploadImage" :loading="uploading" text
          >Attach Image</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase";

export default {
  name: "UploadDialog",
  data: () => ({
    img: null,
    uploading: false,
    uploadValue: 0,
    error: "",
    rules: [
      (files) =>
        !files ||
        !files.some((file) => file.size > 2e6) ||
        "Avatar size should be less than 2 MB!",
    ],
  }),
  methods: {
    uploadImage() {
      if (this.$store.state.imagesUploaded < 5 && this.premiumStatus == false) {
        console.log(this.img);
        console.log(this.img.name);
        var file = this.img;

        const storageRef = firebase
          .storage()
          .ref(`${this.img.name}`)
          .put(file);
        storageRef.on(
          "state_changed",
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.$store.dispatch("uploadImg", url);
              this.$store.commit("toggleUploadDialog");
              this.img = null;
            });
          }
        );
      } else {
        this.error = "You can only attach up to 5 images on a free account!";
      }
    },
    close() {
      this.$store.commit("toggleUploadDialog");
    },
  },
  computed: {
    premiumStatus() {
      return false;
      //TODO: set premium status and return
    },
  },
};
</script>

<style></style>
