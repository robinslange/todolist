<template>
  <v-app>
    <v-content>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" class="addItemBox">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Todo List</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large target="_blank" v-on="on">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Edit Name</span>
                </v-tooltip>
              </v-toolbar>

              <v-col>
                <v-row class="px-4"
                  ><v-text-field
                    label="Add an item"
                    v-model="newItem"
                    @keyup.enter="addItem"
                  >
                    <v-icon slot="append" color="primary" @click="addItem"
                      >mdi-plus</v-icon
                    ></v-text-field
                  ></v-row
                ></v-col
              >
              <v-col class="mx-1">
                <v-list>
                  <v-list-item v-for="item in items" :key="item.title">
                    <v-list-item-avatar>
                      <v-checkbox v-model="item.done"></v-checkbox>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title> {{ item.title }}</v-list-item-title>
                      <v-list-item-subtitle
                        >Added on: {{ date }}{{ ord }} {{ day }} {{ year }}
                      </v-list-item-subtitle></v-list-item-content
                    >
                    <v-btn
                      icon
                      ripple
                      color="red"
                      v-if="item.done"
                      @click="removeTodo(i)"
                    >
                      <v-icon class="red--text">mdi-close</v-icon>
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Index",

  data() {
    return {
      newItem: "",
      todo: [],
      items: [],
      day: this.todoDay(),
      date: new Date().getDate(),
      ord: this.nth(new Date().getDate()),
      year: new Date().getFullYear(),
    };
  },
  methods: {
    addItem() {
      if (!this.newItem) {
        return;
      }
      this.items.push({ title: this.newItem, done: false });
      console.log(this.items);
      this.newItem = "";
    },
    removeTodo(index) {
      this.items.splice(index, 1);
    },
    itemDone() {
      console.log("Item Done");
    },
    todoDay() {
      var d = new Date();
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days[d.getDay()];
    },
    nth(d) {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    },
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<style scoped></style>
