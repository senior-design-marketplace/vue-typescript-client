<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page="50"
      hide-default-footer
      no-data-text="No projects found that match those filters"
      loading-text="Loading projects..."
      :loading="loading"
    >
      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item.id">
            <Card
              v-bind:id="item.id"
              v-bind:avatar="item.thumbnailLink"
              v-bind:title="item.title"
              v-bind:starred="item.starred"
              v-bind:coverImg="item.coverImg"
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
      loading: true,
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
      this.loading = true;
      const env = process.env.NODE_ENV === 'production' ? 'production' : 'staging';
      const sortQuery = `?sortBy=${store.state.sort}`;
      const orderQuery = store.state.order === 'ascending' ? '&order=reverse' : '';
      const majorQuery = store.state.major ? `&requestedMajor=${store.state.major}` : '';
      const tagQuery = store.state.tag ? `&tag=${store.state.tag}` : '';
      const advisorQuery = store.state.advisor ? `&advisorId=${store.state.advisor}` : '';
      const acceptingAppsQuery = store.state.acceptingApps ? '&acceptingApplications=true' : '';
      const hasAdvisorQuery = store.state.hasAdvisor ? '&hasAdvisor=true' : '';

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
          this.loading = false;
        })
        .catch((error) => {});
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
