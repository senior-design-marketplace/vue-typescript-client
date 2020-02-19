<template>
  <div>
    <SortBar />
    <CardDeck v-if="view == 0" />
    <ProjectList v-if="view == 1" />
  </div>
</template>

<script>
import CardDeck from '@/components/CardDeck.vue';
import ProjectList from '@/components/ProjectList.vue';
import SortBar from '@/components/SortBar.vue';
import store from '@/store';

export default {
  name: 'home',
  components: {
    CardDeck,
    ProjectList,
    SortBar,
  },
  computed: {
    view() {
      return this.$store.state.view;
    },
  },
};
</script>
