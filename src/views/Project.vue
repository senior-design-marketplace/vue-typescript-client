<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8">
        <ProjectMain
          v-bind:avatar="items.thumbnailLink"
          v-bind:title="items.title"
          v-bind:starred="items.starred"
          v-bind:coverImg="items.coverLink"
          v-bind:tagline="items.tagline"
          v-bind:description="items.body"
          v-bind:majors="items.requestedMajors"
          v-bind:tags="items.tags"
          v-bind:acceptingApps="items.acceptingApplications"
          v-bind:onProject="onProject"
          v-bind:isAdmin="isAdmin"
        />
        <p />
        <ProjectBoard
          v-model="items.boardItems"
          v-bind:onProject="onProject"
          v-bind:createdAt="items.createdAt"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <Apply
          v-bind:title="items.title"
          v-bind:acceptingApps="items.acceptingApplications"
          v-bind:onProject="onProject"
        />
        <p />
        <ContactInfo
          v-bind:title="items.title"
          v-bind:members="members"
          v-bind:advisors="advisors"
          v-bind:administrators="items.administrators"
        />
        <p />
        <Comments @comment="updateComments" v-bind:comments="items.comments" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiCall from '@/apiCall';
import ProjectBoard from '@/components/ProjectBoard.vue';
import ProjectMain from '@/components/ProjectMain.vue';
import ContactInfo from '@/components/ContactInfo.vue';
import Comments from '@/components/Comments.vue';
import Apply from '@/components/Apply.vue';

export default {
  components: {
    ProjectMain,
    ProjectBoard,
    ContactInfo,
    Comments,
    Apply,
  },
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.getProjectData();
  },
  methods: {
    async getProjectData() {
      const response = await apiCall.methods.get(
        `/projects/${this.projectId}`,
        '',
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.items = response.data;
      }
    },
    updateComments(variable) {
      const newComment = {
        author: 'Test User',
        text: variable,
        datetime: 'Nov 5, 2019 2:45 PM',
      };
      // console.log(this.comments);
      // console.log(newComment);
      this.comments = this.comments.concat(newComment);
      // console.log(this.comments);
    },
  },
  watch: {
    projectId() {
      this.getProjectData();
    },
  },
  computed: {
    projectId() {
      return this.$route.params.id;
    },
    members() {
      if (this.items.administrators === undefined || this.items.administrators === undefined) {
        return [];
      }
      return this.items.administrators
        .filter(admin => !admin.isAdvisor)
        .concat(
          this.items.contributors.filter(
            contrib => !this.items.administrators.map(admin => admin.id).includes(contrib.id),
          ),
        );
    },
    advisors() {
      if (this.items.administrators === undefined) return [];
      return this.items.administrators.filter(admin => admin.isAdvisor);
    },
    onProject() {
      return this.isAdmin || this.isContributor;
    },
    isAdmin() {
      return this.$store.getters.isAdmin(this.projectId);
    },
    isContributor() {
      return this.$store.getters.isContributor(this.projectId);
    },
  },
};
</script>
