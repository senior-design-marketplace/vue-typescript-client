<template>
  <v-container class="mt-10" style="max-width: 1250px; height: 100%">
    <Loading v-if="loading" value="Loading Profile" />
    <div v-else>
      <v-card style="width: 100%; height: 100%">
        <v-row>
          <v-col cols="12" sm="4">
            <v-container>
              <v-hover v-if="isCurrentUser" v-slot:default="{ hover }" style="cursor:pointer;">
                <v-avatar
                  @click.stop="avatarDialog = true"
                  size="200"
                  :color="thumbnailLink !== null ? undefined : 'primary'"
                >
                  <v-img v-if="thumbnailLink !== null" :src="thumbnailLink" />
                  <v-icon v-else size="125" dark>mdi-account-circle</v-icon>
                  <v-overlay :value="hover" absolute opacity="0.75">
                    <v-container class="white--text headline">Click to change avatar.</v-container>
                  </v-overlay>
                </v-avatar>
              </v-hover>
              <v-avatar v-else size="200" :color="thumbnailLink !== null ? undefined : 'primary'">
                <v-img v-if="thumbnailLink !== null" :src="thumbnailLink" />
                <v-icon v-else size="125" dark>mdi-account-circle</v-icon>
              </v-avatar>
              <br /><br />
              <div class="mx-4">
                <v-badge :content="role">
                  <h1>{{ first }} {{ last }}</h1>
                </v-badge>
                <h4 class="grey--text">{{ id }}</h4>
                <v-tooltip v-if="!isCurrentUser && resumeLink !== null" top max-width="175">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      style="position: relative; float: right;"
                      v-on="on"
                      icon
                      x-large
                      v-model="showResume"
                      @click="showResume = !showResume"
                    >
                      <v-icon>mdi-file-eye</v-icon>
                    </v-btn>
                  </template>
                  <span>View Resume</span>
                </v-tooltip>
                <h3>{{ email }}</h3>
                <br /><v-divider /><br />
                <v-toolbar v-if="isCurrentUser" flat>
                  <v-btn
                    :disabled="newBioInvalid"
                    v-if="editBio || bio === null"
                    icon
                    @click="updateBio()"
                  >
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                  <v-btn v-if="editBio" icon @click="toggleEditBio">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-btn v-else-if="bio !== null" icon @click="toggleEditBio">
                    <v-icon> mdi-pencil</v-icon>
                  </v-btn>
                  <v-spacer />
                  <v-tooltip v-if="resumeLink !== null" top max-width="175">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        icon
                        x-large
                        v-model="showResume"
                        @click="showResume = !showResume"
                      >
                        <v-icon>mdi-file-eye</v-icon>
                      </v-btn>
                    </template>
                    <span>View Resume</span>
                  </v-tooltip>
                  <v-btn icon @click="resumeDialog = true" x-large>
                    <v-icon>mdi-file-upload</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-container
                  v-if="!editBio && bio !== null"
                  style="white-space: pre-line;"
                  class="blockquote text-left"
                  v-text="bio"
                />
                <v-textarea
                  v-else-if="isCurrentUser"
                  label="Bio"
                  counter="256"
                  :rows="3"
                  no-resize
                  auto-grow
                  outlined
                  :placeholder="bio"
                  v-model="newBio"
                  :rules="[rules.length(256)]"
                />
                <v-container
                  v-else
                  style="white-space: pre-line;"
                  class="blockquote"
                  v-text="'No Bio'"
                />
              </div>
            </v-container>
          </v-col>
          <v-col cols="12" sm="8">
            <v-divider vertical style="float:left;" />
            <v-switch
              v-if="isCurrentUser"
              style="right: 0px; position: absolute;"
              class="mx-8"
              v-model="darkmode"
              label="Dark Mode"
            />
            <v-container :class="isCurrentUser ? 'ml-2 mt-7' : 'ml-2'">
              <v-container v-if="showResume" style="height: 1100px;">
                <iframe width="100%" height="100%" :src="resumeLink" />
              </v-container>
              <CardDeck v-else-if="projects.length > 0" :items="projects" />
              <h2 v-else>
                <br />
                <v-img
                  contain
                  max-height="300"
                  :src="require('@/../public/assets/noProjects.svg')"
                />
                This user is not on any projects.
              </h2>
            </v-container>
          </v-col>
        </v-row>
        <v-row v-if="this.$route.path == '/debug'">
          <v-container>
            <v-row class="mx-10 my-10">
              <v-text-field label="Token" hide-details v-model="token" ref="tokenRef" />
              <v-btn icon @click="copyToken">
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </v-row>
            <v-row class="mx-10 my-10">
              <v-text-field
                label="URLToken"
                hide-details
                :value="`#access_token=&id_token=${token}&`"
                ref="urlTokenRef"
              />
              <v-btn icon @click="copyURLToken">
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </v-row>
            <v-row class="mx-10 my-10">
              <v-textarea class="mx-1" rows="1" no-resize v-model="debugRoute" />
              <v-btn @click="otherLogin(debugRoute)"> {{ debugRoute }} Login </v-btn>
              <v-btn
                @click="
                  otherLogin('http://marqetplace-staging.s3-website-us-east-1.amazonaws.com/')
                "
              >
                Staging Login
              </v-btn>
            </v-row>
          </v-container>
        </v-row>
      </v-card>
      <MediaUpload
        v-model="resumeDialog"
        :path="`/users/${this.$store.state.userDetails.cognitoUsername}/resume`"
        title="Resume Upload"
        types=".pdf"
        :avatar="false"
        @file="showResume = true"
      />
      <MediaUpload
        v-model="avatarDialog"
        :path="`/users/${this.$store.state.userDetails.cognitoUsername}/avatar`"
        title="Avatar Upload"
        types="image/jpeg, image/png"
        :avatar="true"
        @file="hotswapAvatar"
      />
    </div>
  </v-container>
</template>

<script>
import Loading from '@/components/Loading.vue';
import MediaUpload from '@/components/MediaUpload.vue';
import CardDeck from '@/components/CardDeck.vue';
import apiCall from '@/apiCall';

export default {
  components: {
    Loading,
    CardDeck,
    MediaUpload,
  },
  data() {
    return {
      items: {},
      loading: false,
      avatarDialog: false,
      resumeDialog: false,
      showResume: false,
      newBio: null,
      editBio: false,
      debugRoute: 'http://localhost:8080/',
      rules: {
        length: len => v => (v || '').length <= len || `Invalid character length, must be less than ${len}`,
      },
    };
  },
  methods: {
    copyToken() {
      const textToCopy = this.$refs.tokenRef.$el.querySelector('input');
      textToCopy.select();
      document.execCommand('copy');
    },
    copyURLToken() {
      const textToCopy = this.$refs.urlTokenRef.$el.querySelector('input');
      textToCopy.select();
      document.execCommand('copy');
    },
    otherLogin(debugRoute) {
      window.location.href = `${debugRoute}#access_token=&id_token=${this.token}&`;
    },
    hotswapAvatar(file) {
      this.$store.state.userDetails.thumbnailLink = URL.createObjectURL(file);
    },
    toggleEditBio() {
      this.editBio = !this.editBio;
      this.newBio = this.bio;
    },
    async updateBio() {
      const response = await apiCall.methods.patch(
        `/users/${this.$store.state.userDetails.cognitoUsername}`,
        '',
        {
          bio: this.newBio,
        },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.editBio = false;
        this.$store.commit('updateUserDetail', {
          detail: 'bio',
          value: this.newBio,
        });
      }
    },
    async getProfile() {
      this.loading = true;
      const response = await apiCall.methods.get(`/users/${this.userId}`, '', this.$route.fullPath);
      if (response.status === 200) {
        this.items = response.data;
      }
      this.loading = false;
    },
  },
  mounted() {
    if (!this.isCurrentUser) this.getProfile();
  },
  watch: {
    userId() {
      if (!this.isCurrentUser) this.getProfile();
    },
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
    isCurrentUser() {
      return (
        this.userId === undefined || this.userId === this.$store.state.userDetails.cognitoUsername
      );
    },
    darkmode: {
      get() {
        return this.$store.state.darkmode;
      },
      set() {
        this.$store.commit('toggleDarkMode');
        this.$vuetify.theme.dark = this.$store.state.darkmode;
      },
    },
    thumbnailLink() {
      if (!this.isCurrentUser && this.userId !== undefined) return this.items.thumbnailLink;
      return this.$store.state.userDetails.thumbnailLink;
    },
    resumeLink() {
      if (!this.isCurrentUser && this.userId !== undefined) return this.items.resumeLink;
      return this.$store.state.userDetails.resumeLink;
    },
    first() {
      if (!this.isCurrentUser && this.userId !== undefined) return this.items.firstName;
      return this.$store.state.userDetails.firstName;
    },
    last() {
      if (!this.isCurrentUser && this.userId !== undefined) return this.items.lastName;
      return this.$store.state.userDetails.lastName;
    },
    id() {
      if (!this.isCurrentUser && this.userId !== undefined) return this.items.id;
      return this.$store.state.userDetails.cognitoUsername;
    },
    email() {
      if (!this.isCurrentUser && this.userId !== undefined) return this.items.email;
      return this.$store.state.userDetails.email;
    },
    role() {
      if (!this.isCurrentUser && this.userId !== undefined && this.items.roles !== undefined) {
        if (this.items.roles.includes('faculty')) {
          return 'Faculty';
        }
        if (this.items.roles.includes('student')) {
          return 'Student';
        }
        if (this.items.roles.includes('employee')) {
          return 'Employee';
        }
        if (this.items.roles.includes('affiliate')) {
          return 'Affiliate';
        }
        if (this.items.roles.includes('former-student')) {
          return 'Alumni';
        }
        return 'Member';
      }
      return this.$store.state.userDetails.role;
    },
    bio() {
      if (!this.isCurrentUser && this.userId !== undefined) return this.items.bio;
      return this.$store.state.userDetails.bio;
    },
    token() {
      return this.$store.state.userDetails.token;
    },
    projects() {
      if (!this.isCurrentUser && this.userId !== undefined) {
        if (this.items.projects !== undefined) return this.items.projects;
        return [];
      }
      return this.$store.state.userDetails.administratorOn.concat(
        this.$store.state.userDetails.contributorOn,
      );
    },
    newBioInvalid() {
      if (this.newBio === null) return true;
      return this.newBio.length === 0 || this.newBio.length > 256;
    },
  },
};
</script>
