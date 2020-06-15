<template>
  <v-dialog v-model="this.$store.state.accountPanel" max-width="450">
    <v-card>
      <v-card-title>Account</v-card-title>
      <v-card-actions class="mx-3 my-3">
        <v-switch
          label="Toggle Auto Save"
          v-model="autoSave"
          @change="toggleAutoSave"
        ></v-switch>
        <v-btn style="margin-left: 5% !important;" @click="saveListLink" text
          >Save Current list</v-btn
        >
      </v-card-actions>

      <v-flex class="d-inline-flex nowarp">
        <v-col>
          <v-row v-for="(item, i) in itemsHead" :key="i" class="px-6">
            <span>{{ item }} </span>
          </v-row>
        </v-col>
        <v-col>
          <v-row v-for="(item, i) in itemsTail" :key="i" class="px-6">
            <span>{{ item }}</span>
          </v-row>
        </v-col>
      </v-flex>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AccountPanel",
  data: () => ({
    autoSave: false,
  }),
  methods: {
    toggleAutoSave() {
      this.$store.commit("toggleAutoSave", this.autoSave);
    },
    saveListLink(i) {
      if (this.$store.state.savedLinks.length < 6) {
        this.$store.commit("saveListLink", i);
      }
    },
  },
  computed: {
    itemsHead() {
      return this.$store.state.savedLinks.slice(-3);
    },
    itemsTail() {
      return this.$store.state.savedLinks.slice(3);
    },
  },
};
</script>

<style>
.nowrap {
  white-space: nowrap;
}
</style>
