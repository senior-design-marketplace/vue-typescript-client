<template>
  <v-toolbar dense>
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">{{sort}}</v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in dropdown_sort"
          :key="index"
          @click="sortbyUpdate(item.title)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      <v-divider vertical></v-divider>
      <v-btn @click="orderUpdate">
        <v-icon>{{order=="descending" ? 'mdi-sort-descending' : 'mdi-sort-ascending'}}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <div class="mx-4"></div>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      order: "descending",
      sort: "new",
      dropdown_sort: [{ title: "new" }, { title: "popular" }]
    };
  },
  methods: {
    orderUpdate: function() {
      if (this.order == "descending") {
        this.order = "ascending";
      } else if (this.order == "ascending") {
        this.order = "descending";
      }
      this.$emit("order", this.order);
    },
    sortbyUpdate: function(newSort) {
      this.sort = newSort;
      this.$emit("sort", this.sort);
    }
  }
};
</script>