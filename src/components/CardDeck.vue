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
    this.getProjects();
  },
  watch: {
    sort() {
      this.getProjects();
    },
    order() {
      this.getProjects();
    },
    major() {
      this.getProjects();
    },
    tag() {
      this.getProjects();
    },
    advisor() {
      this.getProjects();
    },
    acceptingApps() {
      this.getProjects();
    },
    hasAdvisor() {
      this.getProjects();
    },
  },
  methods: {
    getProjects() {
      const env = process.env.NODE_ENV === 'production' ? 'production' : 'staging';
      const sortQuery = `?sort_by=${store.state.sort}`;
      const orderQuery = store.state.order === 'ascending' ? '&order=reverse' : '';
      const majorQuery = store.state.major ? `&requested_major=${store.state.major}` : '';
      const tagQuery = store.state.tag ? `&tag=${store.state.tag}` : '';
      const advisorQuery = store.state.advisor ? `&advisor_id=${store.state.advisor}` : '';
      const acceptingAppsQuery = store.state.acceptingApps ? '&accepting_applications' : '';
      const hasAdvisorQuery = store.state.hasAdvisor ? '&has_advisor' : '';

      let url = `https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/${env}/projects`;
      url
      += sortQuery
      + orderQuery
      + majorQuery
      + tagQuery
      + advisorQuery
      + acceptingAppsQuery
      + hasAdvisorQuery;
      axios
        .get(url)
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
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
    major() {
      return this.$store.state.major;
    },
    tag() {
      return this.$store.state.tag;
    },
    advisor() {
      return this.$store.state.advisor;
    },
    acceptingApps() {
      return this.$store.state.acceptingApps;
    },
    hasAdvisor() {
      return this.$store.state.hasAdvisor;
    },
  },
};
</script>
