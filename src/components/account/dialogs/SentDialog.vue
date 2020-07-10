<template>
  <v-snackbar
    v-model="this.$store.state.sentDialog"
    width="220"
    :timeout="1000"
  >
    Reset Email Sent!
  </v-snackbar>
</template>

<script>
export default {};
</script>

<style></style>
