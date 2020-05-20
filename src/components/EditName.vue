<template>
  <div>
    <v-dialog v-model="editName" width="400" @keyup.esc="close">
      <v-card>
        <v-card-title>Edit Name</v-card-title>
        <v-card-text>
          <v-text-field
            label="List Name"
            v-model="newName"
            @keyup.enter="submitName"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="submitName">Confirm</v-btn>
          <v-btn color="primary" text @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "EditName",
  props: ["editName"],
  data() {
    return {
      newName: "",
    };
  },
  methods: {
    submitName() {
      console.log(this.newName);
      if (this.newName) {
        this.$emit("renameList", this.newName);
        this.newName = "";
        this.$emit("close");
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
