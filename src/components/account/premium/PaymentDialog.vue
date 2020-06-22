<template>
  <v-dialog v-model="paymentDialog" width="400" persistent>
    <v-card>
      <v-card-title>
        Buy Premium
        <v-spacer></v-spacer>
        <v-btn @click="close" icon>
          <v-icon>fa-times</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
//import stripe from "@stripe/stripe-js";

export default {
  name: "PaymentDialog",
  data: () => ({}),
  methods: {
    close() {
      this.$store.commit("togglePaymentDialog");
    },
  },
  computed: {
    paymentDialog() {
      return this.$store.state.paymentDialog;
    },
  },
  mounted() {},
};
</script>

<style></style>
