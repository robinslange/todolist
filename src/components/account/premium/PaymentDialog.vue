<template>
  <v-dialog v-model="paymentDialog" persistent>
    <v-card>
      <v-card-title>Buy Premium</v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    paymentDialog() {
      return this.$store.state.paymentDialog;
    },
  },
};
</script>

<style></style>
