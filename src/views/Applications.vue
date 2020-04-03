<template>
  <v-container style="max-width: 1185px;">
    <br />
    <h1 v-if="forApproval.length == 0 && myApps.length == 0">
      <v-img contain max-height="500" :src="require('@/../public/assets/noApps.svg')" />
      You currently have no applications.
    </h1>
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
  },
};
</script>
