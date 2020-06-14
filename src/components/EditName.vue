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
          <v-form ref="editName">
            <v-text-field
              label="List Name"
              v-model="newName"
              counter="25"
              @keypress.enter.prevent="submitName"
              :rules="[
                this.$store.state.rules.counterMax25,
                this.$store.state.rules.counterMin3,
              ]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitName" text>
            Confirm
          </v-btn>
          <v-btn color="primary" @click="close" text>Close</v-btn>
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
      valid: false,
      newName: "",
    };
  },
  methods: {
    submitName() {
      this.valid = this.$refs.editName.validate();
      if (this.valid) {
        this.$store.commit("renameList", this.newName);
      }
    },
    close() {
      this.$store.commit("toggleEditDialog");
    },
  },
};
</script>

<style></style>
