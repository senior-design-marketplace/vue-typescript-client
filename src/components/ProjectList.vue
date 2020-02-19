<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="items" :items-per-page="15" class="elevation-1">
      <template slot="item" slot-scope="props">
        <tr @click=$router.push(/project/+props.item.id)>
          <td>{{props.item.title}}</td>
          <td>{{props.item.tagline}}</td>
          <td><v-chip-group column>
            <v-chip label v-for="tag in props.item.tags" :key="tag" class="noClick">{{tag}}</v-chip>
          </v-chip-group></td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';
import store from '@/store';

export default {
  data() {
    return {
      items: [],
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'title',
        },
        {
          text: 'Tagline',
          align: 'left',
          sortable: false,
          value: 'tagline',
        },
        {
          text: 'Tags',
          align: 'left',
          sortable: false,
          value: 'tags',
        },
      ],
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
