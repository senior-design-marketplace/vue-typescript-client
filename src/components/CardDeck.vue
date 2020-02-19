<template>
  <v-container fluid>
    <v-data-iterator :items="items" :items-per-page="50" hide-default-footer loading="true">
      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item.id">
            <Card
              v-bind:id="item.id"
              v-bind:avatar="item.thumbnail_link"
              v-bind:title="item.title"
              v-bind:starred="item.starred"
              v-bind:coverImg="item.coverImg"
              v-bind:tagline="item.tagline"
              v-bind:tags="item.tags"
            ></Card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import axios from 'axios';
import Card from '@/components/Card.vue';
import store from '@/store';

export default {
  components: {
    Card,
  },
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.updateCards();
  },
  watch: {
    sort() {
      this.updateCards();
    },
    order() {
      this.updateCards();
    },
  },
  methods: {
    updateCards() {
      let url = `https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/staging/projects?sort_by=${this.sort}`;
      if (this.order === 'ascending') {
        url += '&order=reverse';
      }
      axios
        .get(url)
        .then((response) => {
          // console.log(response.data);
          this.items = response.data;
        })
        .catch((error) => {
          // console.log(error);
        });
    },
  },
  computed: {
    sort() {
      return this.$store.state.sort;
    },
    order() {
      return this.$store.state.order;
    },
  },
};
</script>
