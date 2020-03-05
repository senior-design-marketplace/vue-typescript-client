<template>
  <div>
    <br />
    <CardDeck v-if="myProjects.length > 0" :items="myProjects" :loading="loading" />
    <h1 v-else>You are not on any projects!</h1>
  </div>
</template>

<script>
import CardDeck from '@/components/CardDeck.vue';

export default {
  name: 'home',
  components: {
    CardDeck,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    view() {
      return this.$store.state.view;
    },
    myProjects() {
      return this.$store.state.userDetails.administratorOn;
    },
  },
};
</script>
