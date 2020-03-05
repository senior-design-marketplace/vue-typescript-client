<template>
  <div>
    <SortBar />
    <CardDeck v-if="view == 0" :items="items" :loading="loading" />
    <ProjectList v-if="view == 1" :items="items" :loading="loading" />
  </div>
</template>

<script>
import apiCall from '@/apiCall';
import CardDeck from '@/components/CardDeck.vue';
import ProjectList from '@/components/ProjectList.vue';
import SortBar from '@/components/SortBar.vue';

export default {
  name: 'home',
  components: {
    CardDeck,
    ProjectList,
    SortBar,
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
    async getProjects() {
      this.loading = true;
      const sortQuery = `&sortBy=${this.sort}`;
      const orderQuery = this.order === 'ascending' ? '&order=reverse' : '';
      const majorQuery = this.major ? `&requestedMajor=${this.major}` : '';
      const tagQuery = this.tag ? `&tag=${this.tag}` : '';
      const advisorQuery = this.advisor ? `&advisorId=${this.advisor}` : '';
      const acceptingAppsQuery = this.acceptingApps ? '&acceptingApplications=true' : '';
      const hasAdvisorQuery = this.hasAdvisor ? '&hasAdvisor=true' : '';
      const params = sortQuery
        + orderQuery
        + majorQuery
        + tagQuery
        + advisorQuery
        + acceptingAppsQuery
        + hasAdvisorQuery;
      const response = await apiCall.methods.get('/projects', params, this.$route.fullPath);
      if (response.status === 200) {
        this.items = response.data;
        this.loading = false;
      }
    },
  },
  computed: {
    sort() {
      return this.$store.state.filters.sort;
    },
    order() {
      return this.$store.state.filters.order;
    },
    major() {
      return this.$store.state.filters.major;
    },
    tag() {
      return this.$store.state.filters.tag;
    },
    advisor() {
      return this.$store.state.filters.advisor;
    },
    acceptingApps() {
      return this.$store.state.filters.acceptingApps;
    },
    hasAdvisor() {
      return this.$store.state.filters.hasAdvisor;
    },
    view() {
      return this.$store.state.filters.view;
    },
  },
};
</script>
