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
      </v-col>
    </v-row>
    <v-card>
      <v-tabs centered icons-and-text dark background-color="secondary">
        <v-tab>Project Board<v-icon>mdi-timeline</v-icon></v-tab>
        <v-tab>Comments<v-icon>mdi-comment-multiple</v-icon></v-tab>
        <v-tab v-if="isAdmin">History<v-icon>mdi-history</v-icon></v-tab>
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
        <v-tab-item>
          <AuditLog v-bind:history="items.history" />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import apiCall from '@/apiCall';
import ProjectBoard from '@/components/ProjectBoard.vue';
import ProjectMain from '@/components/ProjectMain.vue';
import ContactInfo from '@/components/ContactInfo.vue';
import Comments from '@/components/Comments.vue';
import Apply from '@/components/Apply.vue';
import AuditLog from '@/components/AuditLog.vue';

export default {
  components: {
    ProjectMain,
    ProjectBoard,
    ContactInfo,
    Comments,
    Apply,
    AuditLog,
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
