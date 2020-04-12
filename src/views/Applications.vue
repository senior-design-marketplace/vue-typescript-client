<template>
  <div>
    <v-toolbar class="d-none d-md-flex d-flex justify-center">
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="view" multiple>
        <v-btn value="admin">
          <v-badge
            overlap
            color="primary"
            offset-x="7.5"
            offset-y="7.5"
            :content="forApproval.length"
            :value="forApproval.length"
          >
            <v-icon>mdi-crown</v-icon>
          </v-badge>
        </v-btn>
        <v-btn value="sent">
          <v-badge
            overlap
            color="primary"
            offset-x="7.5"
            offset-y="7.5"
            :content="myApps.length"
            :value="myApps.length"
          >
            <v-icon>mdi-file-send</v-icon>
          </v-badge>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <br />
    <v-sheet :style="$store.state.darkmode ? 'background-color: #121212;' : ''">
      <h1 v-if="forApproval.length == 0 && myApps.length == 0">
        <v-img contain max-height="500" :src="require('@/../public/assets/noApps.svg')" />
        You currently have no applications.
      </h1>
      <h1 v-else-if="noResults">
        <v-img contain max-height="500" :src="require('@/../public/assets/noApps.svg')" />
        No applications found that match those filters.
      </h1>
    </v-sheet>
    <br />
    <div v-show="this.forApproval.length > 0 && view.includes('admin')">
      <v-sheet>
        <h2>Applications for Approval</h2>
      </v-sheet>
      <AppsForApproval :applications="forApproval" style="max-width: 1185px;" />
    </div>
    <br />
    <div v-show="this.myApps.length > 0 && view.includes('sent')">
      <v-sheet>
        <h2>My Applications</h2>
      </v-sheet>
      <MyApplications :applications="myApps" style="max-width: 1185px;" />
    </div>
  </div>
</template>

<script>
import MyApplications from '@/components/MyApplications.vue';
import AppsForApproval from '@/components/AppsForApproval.vue';

export default {
  components: {
    MyApplications,
    AppsForApproval,
  },
  data() {
    return {
      view: [],
    };
  },
  mounted() {
    if (this.forApproval.length > 0 || this.myApps.length > 0) this.view.push(this.forApproval.length > this.myApps.length ? 'admin' : 'sent');
  },
  computed: {
    applications() {
      return this.$store.state.applications;
    },
    forApproval() {
      return this.applications
        .filter(app => app.userId !== this.$store.state.userDetails.cognitoUsername)
        .filter(app => app.status === 'PENDING');
    },
    myApps() {
      return this.applications.filter(
        app => app.userId === this.$store.state.userDetails.cognitoUsername,
      );
    },
    noResults() {
      if (this.view.length === 0) return true;
      if (this.myApps.length === 0 && !this.view.includes('admin')) return true;
      if (this.forApproval.length === 0 && !this.view.includes('sent')) return true;
      return false;
    },
  },
};
</script>
