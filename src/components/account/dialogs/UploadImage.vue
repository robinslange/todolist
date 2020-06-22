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
      <v-list-item>
        <v-file-input accept="image/*" width="200" v-model="img" clearable>
        </v-file-input>
      </v-list-item>

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
    img: "",
    uploading: false,
    uploadValue: 0,
  }),
  methods: {
    uploadImage() {
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
          });
        }
      );
    },
    close() {
      this.$store.commit("toggleUploadDialog");
    },
  },
};
</script>

<style></style>
