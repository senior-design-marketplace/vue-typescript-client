<template>
  <v-card>
    <v-container>
      <v-tooltip
        :disabled="acceptingApps && !onProject && isLoggedIn && !alreadyApplied && !sent"
        top
        max-width="175"
      >
        <template v-slot:activator="{ on }">
          <span v-on="on">
            <v-btn
              :disabled="!acceptingApps || onProject || !isLoggedIn || alreadyApplied || sent"
              outlined
              block
              @click.stop="dialog = true"
            >
              <h2>Apply</h2>
            </v-btn>
          </span>
        </template>
        <span v-if="!isLoggedIn">You must be logged in to apply to a project.</span>
        <span v-else-if="onProject">You are already a member of {{ title }}.</span>
        <span v-else-if="alreadyApplied"
          >You already have a pending application to {{ title }}.</span
        >
        <span v-else-if="sent">Your application to {{ title }} has been sent!</span>
        <span v-else-if="!acceptingApps">{{ title }} is not accepting applications.</span>
        <span v-else>You cannot apply to {{ title }} right now.</span>
      </v-tooltip>

      <v-dialog v-model="dialog" max-width="50%">
        <v-card>
          <v-card-title class="headline">Apply to {{ title }}</v-card-title>
          <v-card-text class="text-left">
            Write your application note below. You may want to include things such as:
            <ul>
              <li>why you want to be on the project</li>
              <li>what your strengths are</li>
              <li>a link to your resume</li>
            </ul>
            <br />
            <v-textarea
              outlined
              clearable
              v-model="note"
              name="Note"
              label="Note"
              counter="256"
              :rules="[rules.length(256)]"
            ></v-textarea>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="this.note.length > 256"
              color="primary"
              text
              @click="submitApplication"
              >Submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-card>
</template>

<script>
import uuid from 'uuid/v4';
import apiCall from '@/apiCall';

export default {
  data() {
    return {
      id: uuid(),
      dialog: false,
      note: '',
      sent: false,
      rules: {
        length: len => v => (v || '').length <= len || `Invalid character length, must be less than ${len}`,
      },
    };
  },
  props: {
    title: String,
    acceptingApps: Boolean,
    onProject: Boolean,
  },
  methods: {
    async submitApplication() {
      const response = await apiCall.methods
        .post(
          `/projects/${this.$route.params.id}/applications`,
          '',
          this.note.length === 0 ? { id: this.id } : { id: this.id, note: this.note },
          this.$route.fullPath,
        )
        .catch((error) => {
          this.dialog = false;
          if (error.response.data.includes('Already participant of project')) {
            alert(`You are already a participant of ${this.title}`); // eslint-disable-line
          }
        });
      if (response.status === 200) {
        this.dialog = false;
        this.note = '';
        this.sent = true;
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    myApps() {
      return this.$store.state.applications.filter(
        app => app.userId === this.$store.state.userDetails.cognitoUsername,
      );
    },
    alreadyApplied() {
      const myPendingApps = this.myApps.filter(app => app.status === 'PENDING');
      return myPendingApps.map(app => app.projectId).includes(this.$route.params.id);
    },
  },
};
</script>
