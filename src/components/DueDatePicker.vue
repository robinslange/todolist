<template>
  <div>
    <v-dialog v-model="this.$store.state.dueDateDialog">
      <v-card>
        <v-date-picker
          v-model="dueDate"
          min="today"
          :color="this.$store.state.titleColor"
          @click:date="setDueDate"
        ></v-date-picker>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DueDatePicker",
  data: () => ({}),
  methods: {
    setDueDate(date) {
      console.log(date);
    },
  },
  computed: {
    today() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + "/" + mm + "/" + dd;
      return today;
    },
  },
};
</script>

<style></style>
