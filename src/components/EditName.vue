<template>
  <div>
    <v-dialog
      v-model="this.$store.state.editDialog"
      width="400"
      @keyup.esc="close"
      persistent
    >
      <v-card>
        <v-card-title>Edit List Name</v-card-title>
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
  data() {
    return {
      newName: "",
    };
  },
  methods: {
    submitName() {
      this.$store.commit("renameList", this.newName);
    },
    close() {
      this.$store.commit("toggleEditDialog");
    },
  },
};
</script>

<style></style>
