<template>
  <v-dialog v-model="this.$store.state.uploadDialog" width="300" persistent>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>
          Attach Image
        </v-toolbar-title>
        <v-progress-linear
          :color="this.$store.state.titleColor"
          :value="uploadValue"
          absolute
          bottom
        ></v-progress-linear>
        <v-spacer></v-spacer>
        <v-btn @click="close" icon>
          <v-icon>fa-times</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list-item two-line>
        <v-file-input
          accept="image/*"
          width="200"
          v-model="img"
          class="py-2 my-2"
          :error-messages="this.$store.state.imgError"
          clearable
        >
        </v-file-input>
      </v-list-item>

      <v-card-subtitle>Supports file sizes up to 2MB</v-card-subtitle>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="uploadImage" :loading="uploading" :disabled="!img" text
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
  }),
  methods: {
    uploadImage() {
      //TODO: add premium check
      if (this.$store.state.imagesUploaded < 5) {
        if (this.img.size < 2e6) {
          this.uploading = true;
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
              this.uploading = false;
              this.$store.state.imgError = error.message;
            },
            () => {
              this.uploadValue = 100;
              storageRef.snapshot.ref.getDownloadURL().then((url) => {
                this.$store.dispatch("uploadImg", url);
                this.$store.commit("toggleUploadDialog");
                this.img = null;
                this.$store.state.imgError = "";
                this.uploading = false;
              });
            }
          );
        } else {
          this.$store.state.imgError = "Maximum file size is 2MB";
        }
      } else {
        this.$store.state.imgError =
          "You can only attach up to 5 images per list!";
      }
    },
    close() {
      this.$store.state.imgError = "";
      this.$store.commit("toggleUploadDialog");
    },
  },
  computed: {},
};
</script>

<style></style>
