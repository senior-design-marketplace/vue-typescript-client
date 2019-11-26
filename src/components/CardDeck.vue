<template>
  <v-container fluid>
    <v-data-iterator :items="items" :items-per-page="50" hide-default-footer>
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
import Card from "@/components/Card.vue";
import axios from "axios";

export default {
  components: {
    Card
  },
  props: {
    sortbyUpdate: String,
    orderUpdate: String
  },
  data() {
    return {
      sortby: "new",
      order: "descending",
      items: []
    };
  },
  mounted() {
    this.updateCards();
  },
  watch: {
    sortbyUpdate: function() {
      this.sortby = this.sortbyUpdate;
      this.updateCards();
    },
    orderUpdate: function() {
      this.order = this.orderUpdate;
      this.updateCards();
    }
  },
  methods: {
    updateCards() {
      var url =
        "https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/staging/projects?sort_by=" +
        this.sortby;
      if (this.order == "ascending") {
        url += "&order=reverse";
      }
      axios
        .get(url)
        .then(response => {
          console.log(response.data);
          this.items = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>