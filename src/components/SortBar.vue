<template>
  <v-toolbar dense>
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">{{ sort }}</v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in sortList" :key="index" @click="sort = item">
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn @click="toggleOrder">
      <v-icon>{{ order == "descending" ? "mdi-sort-descending" : "mdi-sort-ascending" }}</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-btn-toggle v-model="view" mandatory>
      <v-btn default>
        <v-icon>mdi-view-grid</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-toolbar>
</template>

<script>
import store from '@/store';

export default {
  data() {
    return {
      sortList: ['new', 'popular'],
    };
  },
  methods: {
    toggleOrder() {
      if (this.order === 'descending') {
        store.commit('setOrder', 'ascending');
      } else if (this.order === 'ascending') {
        store.commit('setOrder', 'descending');
      }
    },
  },
  computed: {
    sort: {
      get() {
        return this.$store.state.sort;
      },
      set(newSort) {
        store.commit('setSort', newSort);
      },
    },
    order() {
      return this.$store.state.order;
    },
    view: {
      get() {
        return this.$store.state.view;
      },
      set(newView) {
        store.commit('setView', newView);
      },
    },
  },
};
</script>
