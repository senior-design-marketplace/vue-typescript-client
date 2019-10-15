<template>
  <v-app>
    <div id="app">
      <Header />
      <SortBar @order="updateOrder" @sort="sortbyUpdate" />
      <CardDeck :orderUpdate="orderData" :sortbyUpdate="sortbyData" />
    </div>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import CardDeck from "./components/CardDeck.vue";
import SortBar from "./components/SortBar.vue";

export default {
  name: "app",
  components: {
    Header,
    CardDeck,
    SortBar
  },
  data: function() {
    return {
      orderData: "",
      sortbyData: ""
    };
  },
  methods: {
    updateOrder(variable) {
      this.orderData = variable;
    },
    sortbyUpdate(variable) {
      this.sortbyData = variable;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:100");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
</style>
