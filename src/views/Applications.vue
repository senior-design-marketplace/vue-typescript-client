<template>
  <v-container>
    <br />
    <h1 v-if="forApproval.length == 0 && myApps.length == 0">You currently have no applications</h1>
    <br />
    <AppsForApproval v-if="forApproval.length > 0" :applications="forApproval" />
    <br />
    <MyApplications v-if="myApps.length > 0" :applications="myApps" />
  </v-container>
</template>
<script>
import MyApplications from '@/components/MyApplications.vue';
import AppsForApproval from '@/components/AppsForApproval.vue';

export default {
  components: {
    MyApplications,
    AppsForApproval,
  },
  computed: {
    applications() {
      return this.$store.state.notifications
        .filter(notif => notif.document.type === 'APPLICATION')
        .map(notif => notif.document.application);
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
  },
};
</script>
