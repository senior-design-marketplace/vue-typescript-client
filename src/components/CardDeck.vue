<template>
  <v-container>
    <v-data-iterator
    class="ml-n12 mr-n12"
      :items="items"
      :items-per-page="50"
      hide-default-footer
      no-data-text="No projects found that match those filters"
      loading-text="Loading projects..."
      :loading="loading"
    >
      <template v-slot:default="props">
        <v-row align="center">
          <v-col v-for="item in props.items" :key="item.id">
            <Card
              v-bind:id="item.id"
              v-bind:avatar="item.thumbnailLink"
              v-bind:title="item.title"
              v-bind:starred="item.starred"
              v-bind:coverImg="item.coverLink"
              v-bind:tagline="item.tagline"
              v-bind:tags="item.tags"
              v-bind:acceptingApps="item.acceptingApplications"
            ></Card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  components: {
    Card,
  },
  props: {
    items: Array,
    loading: Boolean,
  },
};
</script>
