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

      <div v-if="!this.$store.state.user.premium">
        <v-card-subtitle>Purchase Premium for US$6.99 below:</v-card-subtitle>
        <PayPal
          amount="6.99"
          currency="USD"
          :client="credentials"
          :credentials="credentials"
          env="sandbox"
          @payment-completed="updatePremiumStatus"
        />
      </div>
      <h3
        v-if="this.$store.state.user.premium"
        style="color:green;font-style:strong;"
      >
        Thank you for purchasing premium!
      </h3>
      <v-spacer></v-spacer>
      <PaymentDialog />
    </v-card-actions>
  </v-card>
</template>

<script>
import PayPal from "vue-paypal-checkout";
import db from "@/firebase/init";

export default {
  components: {
    PayPal,
  },
  name: "Premium",
  data: () => ({
    credentials: {
      sandbox:
        "AfaoiGDGMKvy59qBUZ4DaHJACUtPclUTjiiWPcruGrqPNle2r0nmPpgPm2A2-RUOdcqIwaqAuFHfabDE",
      production:
        "AVmAIMcZDeK6ogH98yTnql6RAcJnT15gUjyxukCE9JwFWwq7WD05LV-Gcy12_ozutKFxJ3r9czAvLpqZ",
    },
  }),
  methods: {
    //TODO: implement payments
    //https://softauthor.com/stripe-payments-with-custom-stripe-elements-vue-cloud-functions/
    togglePaymentDialog() {
      this.$store.commit("togglePaymentDialog");
    },
    updatePremiumStatus() {
      let uid = this.$store.state.user.uid;
      this.$store.commit("SET_USER_PREMIUM", true);
      let userRef = db.collection("users").doc(uid);
      userRef
        .update({
          premium: true,
        })
        .then(() => {
          console.log("transaction complete");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    log() {
      console.log(this.$store.state.user);
    },
  },
};
</script>

<style scoped></style>
