<template>
  <div>
    <SortBar @order="updateOrder" @sort="sortbyUpdate" />
    <CardDeck :orderUpdate="orderData" :sortbyUpdate="sortbyData" />
  </div>
</template>

<script>
import CardDeck from "@/components/CardDeck.vue";
import SortBar from "@/components/SortBar.vue";

export default {
  components: {
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
