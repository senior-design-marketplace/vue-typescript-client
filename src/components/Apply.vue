<template>
  <v-card>
    <v-container>
      <v-tooltip :disabled="acceptingApps && !onProject && isLoggedIn" top max-width="175">
        <template v-slot:activator="{ on }">
          <span v-on="on">
            <v-btn
              :disabled="!acceptingApps || onProject || !isLoggedIn"
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
        <span v-else>{{ title }} is not accepting applications.</span>
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
              counter="2048"
            ></v-textarea>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="submitApplication">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-card>
</template>

<script>
import axios from 'axios';
import uuid from 'uuid/v4';
import store from '@/store';

export default {
  data() {
    return {
      id: uuid(),
      dialog: false,
      note: '',
    };
  },
  props: {
    title: String,
    acceptingApps: Boolean,
    onProject: Boolean,
  },
  methods: {
    submitApplication() {
      const env = process.env.NODE_ENV === 'production' ? 'production' : 'staging';
      const token = store.state.id_token;
      const url = `https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/${env}/projects/${this.$route.params.id}/applications?id_token=${token}`;
      const body = {
        id: this.id,
      };
      if (this.note !== '') body.note = this.note;
      axios
        .post(url, body)
        .then((response) => {
          // console.log(response.data);
          this.dialog = false;
        })
        .catch((error) => {
          this.dialog = false;
          if (error.response.data.type === 'AuthenticationError') {
            alert("Session expired. Redirecting to Stevens Login"); // eslint-disable-line
            store.commit('setsavePath', this.$route.fullPath);
            window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
          } else if (error.response.data.includes('Already participant of project')) {
            alert(`You are already a participant of ${this.title}`); // eslint-disable-line
          } else {
            alert("Input Error"); // eslint-disable-line
          }
        });
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
