<template>
  <v-card flat>
    <v-card-title>
      Your Saved Lists
      <v-spacer></v-spacer>
      <v-btn @click="saveListLink" :disabled="!onAList"
        >Save current list</v-btn
      >
    </v-card-title>
    <v-card-subtitle v-if="loggedIn"
      >Synced Lists: {{ syncedListCount }}<span v-if="!premium">/5</span>
      <span v-else
        >/<v-icon size="16">fa-infinity</v-icon></span
      ></v-card-subtitle
    >
    <v-card max-height="150px" class="scroll" v-if="!loading" flat>
      <v-list>
        <v-list-item
          v-for="(item, i) in this.$store.state.savedLinks"
          :key="i"
          style="align-items: center;"
        >
          <a :href="item" target="_blank">
            <v-btn icon>
              <v-icon size="16">fa-external-link-alt</v-icon>
            </v-btn>
          </a>
          <v-list-item-title>
            <span class="fullSelect">{{ item }}</span>
          </v-list-item-title>
          <v-list-item-action class="d-inline-flex">
            <v-btn @click="deleteSavedLink(i)" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn
              @click="removeFromSyncedLists(i)"
              v-if="loggedIn && syncedLists.includes(item)"
              icon
            >
              <v-icon>mdi-cloud-off-outline</v-icon>
            </v-btn>
            <v-btn
              @click="addToSyncedLists(i)"
              v-if="!syncedLists.includes(item)"
              icon
            >
              <v-icon>mdi-cloud-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-card-subtitle class="text-center">
        <v-spacer></v-spacer>
        If you can't see your synced lists, try refreshing the page.
        <v-spacer></v-spacer>
      </v-card-subtitle>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "SavedLists",
  data: () => ({}),
  methods: {
    inArray(needle) {
      let haystack = this.syncedLists;
      let length = haystack.length;
      for (let i = 0; i < length; i++) {
        if (haystack[i] == needle) return true;
      }
      return false;
    },
    saveListLink() {
      this.$store.commit("saveListLink");
    },
    deleteSavedLink(i) {
      this.$store.commit("deleteListLink", i);
    },
    addToSyncedLists(i) {
      this.$store.dispatch("addToSyncedLists", i);
    },
    removeFromSyncedLists(i) {
      this.$store.dispatch("deleteFromSyncedLists", i);
    },
    forceUpdate() {
      this.$forceUpdate();
    },
  },

  computed: {
    loggedIn() {
      return this.$store.state.user.loggedIn;
    },
    onAList() {
      if (this.$store.state.todoListID) {
        return true;
      } else {
        return false;
      }
    },
    syncedLists() {
      return this.$store.state.user.syncedLists;
    },
    loading() {
      return this.$store.state.syncedListsLoading;
    },
    syncedListCount() {
      return this.$store.state.user.syncedLists.length;
    },
    premium() {
      return this.$store.state.user.premium;
    },
  },
  mounted() {
    this.forceUpdate();
  },
};
</script>

<style></style>
