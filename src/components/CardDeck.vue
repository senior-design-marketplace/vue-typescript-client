<template>
  <v-container>
    <Loading v-if="loading" value="Loading Projects" />
    <v-sheet
      v-else-if="items.length === 0"
      :style="$store.state.darkmode ? 'background-color: #121212;' : ''"
    >
      <h1>
        <v-img contain max-height="500" :src="require('@/../public/assets/noResults.svg')" />
        No projects found that match those filters.
      </h1>
    </v-sheet>
    <v-data-iterator
      :items="items"
      hide-default-footer
      no-data-text
      loading-text=""
      disable-pagination
      :loading="loading"
    >
      <template v-slot:default="props">
        <v-row align="center">
          <v-col v-for="(item, index) in props.items" :key="index">
            <Card
              v-bind:item="item"
              v-bind:id="item.id"
              v-bind:avatar="item.thumbnailLink"
              v-bind:title="item.title"
              v-bind:starred="starred(item.id)"
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
import Loading from '@/components/Loading.vue';
import Card from '@/components/Card.vue';

export default {
  components: {
    Card,
    Loading,
  },
  props: {
    items: Array,
    loading: Boolean,
  },
  methods: {
    starred(value) {
      return this.$store.getters.isStarred(value);
    },
  },
};
</script>
