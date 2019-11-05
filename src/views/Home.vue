<template>
  <div>
    <SortBar @order="updateOrder" @sort="sortbyUpdate" @view="viewUpdate"/>
    <CardDeck v-if="viewData == 0" :orderUpdate="orderData" :sortbyUpdate="sortbyData" />
    <ProjectList v-if="viewData == 1" :orderUpdate="orderData" :sortbyUpdate="sortbyData" />
  </div>
</template>

<script>
import CardDeck from "@/components/CardDeck.vue";
import ProjectList from "@/components/ProjectList.vue";
import SortBar from "@/components/SortBar.vue";

export default {
  name: "home",
  components: {
    CardDeck,
    ProjectList,
    SortBar
  },
  data: function() {
    return {
      orderData: "",
      sortbyData: "",
      viewData: ""
    };
  },
  methods: {
    updateOrder(variable) {
      this.orderData = variable;
    },
    sortbyUpdate(variable) {
      this.sortbyData = variable;
    },
    viewUpdate(variable) {
      this.viewData = variable;
    },
  }
};
</script>
