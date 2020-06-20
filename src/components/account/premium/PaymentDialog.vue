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
      <div ref="card"></div>
    </v-card>
  </v-dialog>
</template>

<script>
const stripe = require("stripe")(
  "pk_test_51Gw3yyJAWBzvz0Sm9UqBdwWxVp7N9n8STEAUzw9aXVcBqzEdcSltbqSTm2IrrQkwk6Yyb1f6JHqrT63pyumQUmnW00uHwrcUrk"
);

const paymentIntent = await stripe.paymentIntents.create({
  amount: "599",
  currency: "nzd",
  metadata: { integratin_check: "accept_a_payment" },
});

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
    makePayment() {
        var response = fetch('/secret')
    }
  },
  mounted() {},
};
</script>

<style></style>
