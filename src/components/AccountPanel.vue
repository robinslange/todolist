<template>
  <v-dialog
    v-model="this.$store.state.accountPanel"
    max-width="450"
    max-height="350"
  >
    <v-card>
      <v-card-title>
        Account
        <v-spacer></v-spacer>
        <v-btn @click="close" icon>
          <v-icon>fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>
      <v-card flat>
        <v-card-title>
          Your Saved Lists
          <v-spacer></v-spacer>
          <v-btn @click="saveListLink">Save current list</v-btn>
        </v-card-title>
        <v-card-actions> </v-card-actions>
        <v-card max-height="150px" class="scroll" flat>
          <v-list>
            <v-list-item
              v-for="(item, i) in this.$store.state.savedLinks"
              :key="i"
              style="align-items: center;"
            >
              <a :href="item">
                <v-btn icon>
                  <v-icon size="16">fa-external-link-alt</v-icon>
                </v-btn>
              </a>
              <v-list-item-title>
                <span class="fullSelect">{{ item }}</span>
              </v-list-item-title>
              <v-list-item-action>
                <v-btn @click="deleteSavedLink(i)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-card>
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
    saveListLink() {
      this.$store.commit("saveListLink");
    },
    deleteSavedLink(i) {
      this.$store.commit("deleteListLink", i);
    },
    close() {
      this.$store.commit("toggleAccountPanel");
    },
  },
  computed: {},
};
</script>

<style scoped>
.nowrap {
  white-space: nowrap;
}
.scroll {
  overflow-y: auto;
}
.fullSelect {
  -webkit-user-select: all; /* Chrome 49+ */
  -moz-user-select: all; /* Firefox 43+ */
  -ms-user-select: all; /* No support yet */
  user-select: all; /* Likely future */
}
</style>
