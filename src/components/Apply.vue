<template>
  <span>
    <v-tooltip :disabled="buttonEnabled" top max-width="175">
      <template v-slot:activator="{ on }">
        <v-hover v-slot:default="{ hover }">
          <v-toolbar
            @click="!buttonEnabled ? '' : (dialog = true)"
            v-on="on"
            :style="buttonEnabled ? 'cursor: pointer;' : ''"
            :elevation="buttonEnabled ? (hover ? 12 : 4) : 1"
            :ripple="false"
          >
            <v-container :class="buttonEnabled ? 'headline' : 'grey--text headline'">
              Apply
            </v-container>
          </v-toolbar>
        </v-hover>
      </template>
      <span v-if="!isLoggedIn">You must be logged in to apply to a project.</span>
      <span v-else-if="onProject">You are already a member of this project.</span>
      <span v-else-if="alreadyApplied">You already have a pending application.</span>
      <span v-else-if="sent">Your application has been sent!</span>
      <span v-else-if="!acceptingApps">This project is not accepting applications.</span>
      <span v-else>You cannot apply to this project right now.</span>
    </v-tooltip>
    <v-dialog :persistent="loading" v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">
          Apply to {{ title }}
          <v-spacer></v-spacer>
          <v-progress-circular v-if="loading" indeterminate color="primary" />
        </v-card-title>
        <v-card-text class="text-left">
          Complete the follow questions below to submit your applecation
          <v-textarea
            outlined
            v-model="why"
            name="why be on this project"
            label="List why you want to be on this project"
            counter="256"
            :disabled="loading"
            :rules="[rules.length(256)]"
          ></v-textarea>
          <br />
          <v-textarea
            outlined
            v-model="skills"
            name="Skills"
            label="What skills and strengths would make you essential to this project"
            counter="256"
            :disabled="loading"
            :rules="[rules.length(256)]"
          ></v-textarea>
          <br />
          <v-textarea
            outlined
            v-model="experience"
            name="Past work experience"
            label="Please disccuss any past work experience you could bring to this project"
            counter="256"
            :disabled="loading"
            :rules="[rules.length(256)]"
          ></v-textarea>
          <br />
          <v-textarea
            outlined
            v-model="resume"
            name="Resume"
            label="Please link your resume here/other valuable information(Github, Solidworks, etc)"
            counter="256"
            :disabled="loading"
            :rules="[rules.length(256)]"
          ></v-textarea>
          <br />
          <v-textarea
            outlined
            v-model="note"
            name="Any aditional comments"
            label="Additional comments"
            counter="256"
            :disabled="loading"
            :rules="[rules.length(256)]"
          ></v-textarea>
        </v-card-text>
        <v-card-text>
          <v-btn
            :disabled="(note !== null && note.length > 256) || loading"
            outlined
            color="primary"
            @click="submitApplication"
          >
            <h2>Submit</h2>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog :value="sentDialog > 0" max-width="600">
      <v-card>
        <h1>
          <v-img contain max-height="500" :src="require('@/../public/assets/appCreated.svg')" />
          Application to {{ title }} sent!
        </h1>
        <br />
        <v-progress-linear :value="sentDialog" />
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import uuid from 'uuid/v4';
import apiCall from '@/apiCall';

export default {
  data() {
    return {
      id: uuid(),
      dialog: false,
      loading: false,
      note: null,
      why: null,
      experience: null,
      skills: null,
      resume: null,
      sent: false,
      sentTime: undefined,
      sentDialog: 0,
      rules: {
        length: len => v => v === null || v.length <= len || `Invalid character length, must be less than ${len}`,
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
      this.loading = true;
      await apiCall.methods
        .post(
          `/projects/${this.$route.params.id}/applications`,
          '',
          this.note === null || this.note.length === 0
            ? { id: this.id }
            : { id: this.id, note: this.note },
          this.$route.fullPath,
        )
        .then((response) => {
          if (response.status === 200) {
            this.dialog = false;
            this.note = '';
            this.showSentDialog();
            this.sent = true;
            this.loading = false;
          }
        })
        .catch((error) => {
          if (error.response.data.includes('Already participant of project')) {
            alert(`You are already a participant of ${this.title}`); // eslint-disable-line
          }
          this.loading = false;
        });
    },
    showSentDialog() {
      this.sentTime = new Date();
      this.sentTime.setSeconds(this.sentTime.getSeconds() + 5);
      this.updatesentDialog();
      const interval = setInterval(() => {
        if (this.sentDialog < 0) {
          clearInterval(interval);
        } else this.updatesentDialog();
      }, 150);
    },
    updatesentDialog() {
      this.sentDialog = (this.sentTime - new Date()) / 50;
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
    buttonEnabled() {
      return (
        this.acceptingApps
        && !this.onProject
        && this.isLoggedIn
        && !this.alreadyApplied
        && !this.sent
      );
    },
  },
};
</script>
