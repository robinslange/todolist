<template>
  <v-dialog v-model="this.$store.state.paymentDialog" width="400" persistent>
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

export default {
  name: "PaymentDialog",
  components: {},
  data: () => ({
    publishableKey: this.$store.state.publishableKey
  }),
  methods: {
    close() {
      this.$store.commit("togglePaymentDialog");
    }
  },
  computed: {
    paymentDialog() {
      return this.$store.state.paymentDialog;
    }
  }
};
</script>

<style></style>
