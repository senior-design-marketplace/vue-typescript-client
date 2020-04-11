<template>
  <v-container style="max-width: 1185px;">
    <Loading v-if="loading" value="Loading Project" />
    <span v-else>
      <v-row>
        <v-col cols="12" sm="8">
          <ProjectTitle
            @update="getProjectData"
            v-bind:avatar="items.thumbnailLink"
            v-bind:title="items.title"
            v-bind:starred="starred"
            v-bind:coverImg="items.coverLink"
            v-bind:acceptingApps="items.acceptingApplications"
            v-bind:onProject="onProject"
            v-bind:isAdmin="isAdmin"
            v-bind:history="items.history"
            @adminPanel="adminPanel = !adminPanel"
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
            @update="getProjectData"
            v-bind:title="items.title"
            v-bind:contributors="items.contributors"
            v-bind:administrators="items.administrators"
          />
        </v-col>
      </v-row>
      <ProjectMain
        @update="getProjectData"
        v-bind:tagline="items.tagline"
        v-bind:description="items.body"
        v-bind:majors="items.requestedMajors"
        v-bind:tags="items.tags"
        v-bind:onProject="onProject"
      />
      <p />
      <v-card>
        <v-tabs centered icons-and-text dark background-color="secondary">
          <v-tab>Project Board<v-icon>mdi-timeline</v-icon></v-tab>
          <v-tab>Comments<v-icon>mdi-comment-multiple</v-icon></v-tab>
          <v-tab-item>
            <ProjectBoard
              v-model="items.boardItems"
              v-bind:onProject="onProject"
              v-bind:createdAt="items.createdAt"
            />
          </v-tab-item>
          <v-tab-item>
            <Comments
              @update="getProjectData"
              v-bind:comments="items.comments"
              v-bind:isAdmin="isAdmin"
            />
          </v-tab-item>
        </v-tabs>
      </v-card>
    </span>
    <AdminPanel
      @update="getProjectData"
      v-model="adminPanel"
      :title="items.title"
      :history="items.history"
      :acceptingApps="items.acceptingApplications"
      :contributors="items.contributors"
      :administrators="items.administrators"
      :applications="forApproval"
    />
  </v-container>
</template>

<script>
import apiCall from '@/apiCall';
import Loading from '@/components/Loading.vue';
import ProjectBoard from '@/components/ProjectBoard.vue';
import ProjectTitle from '@/components/ProjectTitle.vue';
import ProjectMain from '@/components/ProjectMain.vue';
import ContactInfo from '@/components/ContactInfo.vue';
import Comments from '@/components/Comments.vue';
import Apply from '@/components/Apply.vue';
import AdminPanel from '@/components/AdminPanel.vue';

export default {
  components: {
    Loading,
    ProjectTitle,
    ProjectMain,
    ProjectBoard,
    ContactInfo,
    Comments,
    Apply,
    AdminPanel,
  },
  data() {
    return {
      items: [],
      loading: true,
      adminPanel: false,
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
      this.loading = false;
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
    isAdmin() {
      return this.$store.getters.isAdmin(this.projectId);
    },
    isContributor() {
      return this.$store.getters.isContributor(this.projectId);
    },
    onProject() {
      return this.isAdmin || this.isContributor;
    },
    starred() {
      return this.$store.getters.isStarred(this.$route.params.id);
    },
    forApproval() {
      if (this.items.applications === undefined) return [];
      return this.items.applications.filter(app => app.status === 'PENDING');
    },
  },
};
</script>
