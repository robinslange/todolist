<template>
  <v-card class="px-2 py-2" flat>
    <v-card-subtitle>
      Get access to lots of great features and support development of more!
    </v-card-subtitle>

    <v-list-item three-line>
      <v-list-item-icon>
        <v-icon>fa-cloud-upload-alt</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Sync more lists!</v-list-item-title>
        <v-list-item-subtitle>
          Save as many lists as you want to your account, taking them all with
          you wherever you login!
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item three-line>
      <v-list-item-icon>
        <v-icon>fa-images</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Upload more pictures!</v-list-item-title>
        <v-list-item-subtitle>
          Attach as many images as you want to the lists you create, instead of
          just 5 per list.
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item three-line>
      <v-list-item-icon>
        <v-icon>fa-terminal</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Support Development</v-list-item-title>
        <v-list-item-subtitle>
          Your contributions allow me to expand and build on this app. Let me
          know what you want to see added!
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="togglePaymentDialog" tile outlined color="success">
        <v-icon left>fa-coins</v-icon>
        Get Premium
      </v-btn>
      <v-spacer></v-spacer>
      <PaymentDialog />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {
    PaymentDialog: () => import("@/components/account/premium/PaymentDialog"),
  },
  name: "Premium",
  data: () => ({}),
  methods: {
    //TODO: implement payments
    //https://softauthor.com/stripe-payments-with-custom-stripe-elements-vue-cloud-functions/
    togglePaymentDialog() {
      this.$store.commit("togglePaymentDialog");
    },
  },
};
</script>

<style scoped></style>
