<template>
  <v-container>
    <br />
    <h1> Applications</h1>
    <br />
    <ApplicationList />
  </v-container>
</template>
<script>
import ApplicationList from '@/components/ApplicationList.vue';

export default {
  components: { ApplicationList },
};
</script>
