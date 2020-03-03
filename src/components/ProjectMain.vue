<template>
  <div>
    <v-toolbar>
      <v-img v-if="avatar != null" :src="avatar" max-height="50" max-width="50" />
      <v-list-item-avatar v-else-if="title != null" color="primary">
        <span class="white--text headline" v-text="title.substring(0, 1).toLowerCase()" />
      </v-list-item-avatar>
      <h2 v-if="!editTitle" class="text-left">{{ title }}</h2>
      <v-textarea
        v-else
        class="mx-1"
        label="Title"
        rows="1"
        hide-details
        no-resize
        :placeholder="title"
        v-model="newTitle"
      />
      <v-btn v-if="editTitle" icon @click="updateTitle()">
        <v-icon color="gray">mdi-check</v-icon>
      </v-btn>
      <v-btn v-if="editTitle" icon @click="editTitle = false">
        <v-icon color="gray">mdi-close</v-icon>
      </v-btn>
      <v-btn-toggle v-else-if="isAdmin" borderless rounded v-model="editTitle">
        <v-btn icon :value="true">
          <v-icon color="gray">mdi-pencil</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-item-group>
        <v-list-item>
          <v-item v-slot:default="{ active, toggle }">
            <v-btn icon @click="toggle">
              <v-icon v-bind:color="active ? 'yellow accent-4' : 'gray'">mdi-star</v-icon>
            </v-btn>
          </v-item>
        </v-list-item>
      </v-item-group>
      <v-tooltip top max-width="175">
        <template v-slot:activator="{ on }">
          <v-btn v-if="isAdmin" icon v-on="on" @click="toggleAcceptingApps()">
            <v-icon v-if="!editAcceptingApps" v-bind:color="acceptingApps ? 'success' : 'gray'">
              mdi-sticker-check-outline
            </v-icon>
            <v-progress-circular v-else indeterminate />
          </v-btn>
          <v-span v-else icon v-on="on">
            <v-icon v-if="!editAcceptingApps" v-bind:color="acceptingApps ? 'success' : 'gray'">
              mdi-sticker-check-outline
            </v-icon>
            <v-progress-circular v-else indeterminate />
          </v-span>
        </template>
        <span v-if="acceptingApps">{{ title }} is accepting applications.</span>
        <span v-else>{{ title }} is not accepting applications.</span>
      </v-tooltip>
    </v-toolbar>
    <p />
    <v-card>
      <v-img v-if="coverImg != null" :src="coverImg" max-height="350"></v-img>
      <v-img
        v-else
        :src="randomCover"
        max-height="350"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      >
        <v-overlay :absolute="true">
          <v-container class="white--text display-3" v-text="title" />
        </v-overlay>
      </v-img>
    </v-card>
    <p />
    <v-card>
      <v-container>
        <h2 class="text-left">
          Tagline:
          <v-btn v-if="editTagline" icon @click="updateTagline()">
            <v-icon color="gray">mdi-check</v-icon>
          </v-btn>
          <v-btn v-if="editTagline" icon @click="editTagline = false">
            <v-icon color="gray">mdi-close</v-icon>
          </v-btn>
          <v-btn-toggle v-else-if="isAdmin" borderless rounded v-model="editTagline">
            <v-btn icon :value="true">
              <v-icon color="gray">mdi-pencil</v-icon>
            </v-btn>
          </v-btn-toggle>
        </h2>
        <v-container v-if="!editTagline" class="text-left" v-text="tagline" />
        <v-textarea
          v-else
          class="mx-1"
          label="Tagline"
          rows="1"
          hide-details
          no-resize
          :placeholder="tagline"
          v-model="newTagline"
        />
        <h2 class="text-left">
          Description:
          <v-btn v-if="editDescription" icon @click="updateDescription()">
            <v-icon color="gray">mdi-check</v-icon>
          </v-btn>
          <v-btn v-if="editDescription" icon @click="editDescription = false">
            <v-icon color="gray">mdi-close</v-icon>
          </v-btn>
          <v-btn-toggle v-else-if="isAdmin" borderless rounded v-model="editDescription">
            <v-btn icon :value="true">
              <v-icon color="gray">mdi-pencil</v-icon>
            </v-btn>
          </v-btn-toggle>
        </h2>
        <v-container v-if="!editDescription" class="text-left" v-text="description" />
        <v-textarea
          v-else
          class="mx-1"
          label="Description"
          hide-details
          no-resize
          :placeholder="description"
          v-model="newDescription"
        />
        <h2 class="text-left">Majors:</h2>
        <v-chip-group column>
          <v-chip label v-for="major in majors" :key="major" class="noClick">{{ major }}</v-chip>
        </v-chip-group>
        <br />
        <h2 class="text-left">Tags:</h2>
        <v-chip-group column>
          <v-chip label v-for="tag in tags" :key="tag" class="noClick">{{ tag }}</v-chip>
        </v-chip-group>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store';

export default {
  props: {
    avatar: String,
    title: String,
    starred: Boolean,
    coverImg: String,
    tagline: String,
    description: String,
    majors: Array,
    tags: Array,
    acceptingApps: Boolean,
    onProject: Boolean,
    isAdmin: Boolean,
  },
  data: () => ({
    editTitle: false,
    newTitle: '',
    editTagline: false,
    newTagline: '',
    editDescription: false,
    newDescription: '',
    editAcceptingApps: false,
  }),
  methods: {
    updateTitle() {
      const env = process.env.NODE_ENV === 'production' ? 'production' : 'staging';
      const token = store.state.id_token;
      const url = `https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/${env}/projects/${this.$route.params.id}?id_token=${token}`;
      const body = {
        title: this.newTitle,
      };
      axios
        .patch(url, body)
        .then((response) => {
          // console.log(response.data);
          this.editTitle = false;
          this.title = this.newTitle;
        })
        .catch((error) => {
          if (error.response.data.type === 'AuthenticationError') {
            alert("Session expired. Redirecting to Stevens Login"); // eslint-disable-line
            store.commit('setsavePath', this.$route.fullPath);
            window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
          } else {
            alert("Input Error"); // eslint-disable-line
          }
        });
    },
    updateTagline() {
      const env = process.env.NODE_ENV === 'production' ? 'production' : 'staging';
      const token = store.state.id_token;
      const url = `https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/${env}/projects/${this.$route.params.id}?id_token=${token}`;
      const body = {
        tagline: this.newTagline,
      };
      axios
        .patch(url, body)
        .then((response) => {
          // console.log(response.data);
          this.editTagline = false;
          this.tagline = this.newTagline;
        })
        .catch((error) => {
          if (error.response.data.type === 'AuthenticationError') {
            alert("Session expired. Redirecting to Stevens Login"); // eslint-disable-line
            store.commit('setsavePath', this.$route.fullPath);
            window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
          } else {
            alert("Input Error"); // eslint-disable-line
          }
        });
    },
    updateDescription() {
      const env = process.env.NODE_ENV === 'production' ? 'production' : 'staging';
      const token = store.state.id_token;
      const url = `https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/${env}/projects/${this.$route.params.id}?id_token=${token}`;
      const body = {
        body: this.newDescription,
      };
      axios
        .patch(url, body)
        .then((response) => {
          // console.log(response.data);
          this.editDescription = false;
          this.description = this.newDescription;
        })
        .catch((error) => {
          if (error.response.data.type === 'AuthenticationError') {
            alert("Session expired. Redirecting to Stevens Login"); // eslint-disable-line
            store.commit('setsavePath', this.$route.fullPath);
            window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
          } else {
            alert("Input Error"); // eslint-disable-line
          }
        });
    },
    toggleAcceptingApps() {
      this.editAcceptingApps = true;
      const env = process.env.NODE_ENV === 'production' ? 'production' : 'staging';
      const token = store.state.id_token;
      const url = `https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/${env}/projects/${this.$route.params.id}?id_token=${token}`;
      const body = {
        acceptingApplications: !this.acceptingApps,
      };
      axios
        .patch(url, body)
        .then((response) => {
          // console.log(response.data);
          this.acceptingApps = !this.acceptingApps;
          this.editAcceptingApps = false;
        })
        .catch((error) => {
          this.editAcceptingApps = false;
          if (error.response.data.type === 'AuthenticationError') {
            alert("Session expired. Redirecting to Stevens Login"); // eslint-disable-line
            store.commit('setsavePath', this.$route.fullPath);
            window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
          } else {
            alert("Input Error"); // eslint-disable-line
          }
        });
    },
  },
  mounted() {
    this.newTitle = this.title;
    this.newTagline = this.tagline;
    this.newDescription = this.description;
  },
  computed: {
    randomCover() {
      return `https://picsum.photos/766/350?${this.title}`;
    },
  },
};
</script>

<style>
.noClick {
  pointer-events: none;
}
</style>
