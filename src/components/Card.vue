<template :id="id">
  <v-hover v-slot:default="{ hover }">
    <v-card width="350" height="350" class="mx-auto" :elevation="hover ? 12 : 2" :ripple="false">
      <v-container class="pa-1" @click="$router.push(`/project/${id}`)" style="cursor: pointer;">
        <v-item-group>
          <v-list-item>
            <v-avatar v-if="avatar != null" size="35">
              <v-img :src="avatar" />
            </v-avatar>
            <v-avatar v-else-if="title != null" size="35" color="primary">
              <span class="white--text headline" v-text="title.substring(0, 1).toLowerCase()" />
            </v-avatar>

            <v-list-item-content>
              <v-flex class="headline" v-text="title"></v-flex>
            </v-list-item-content>
            <v-item v-if="onProject">
              <v-tooltip top max-width="175">
                <template v-slot:activator="{ on }">
                  <span icon v-on="on">
                    <v-icon color="primary">mdi-account-check</v-icon>
                  </span>
                </template>
                <span>You are a member of this project.</span>
              </v-tooltip>
            </v-item>
            <v-item v-else-if="alreadyApplied">
              <v-tooltip top max-width="175">
                <template v-slot:activator="{ on }">
                  <span icon v-on="on">
                    <v-icon color="warning">mdi-sticker-minus-outline</v-icon>
                  </span>
                </template>
                <span>You have a pending application to this project.</span>
              </v-tooltip>
            </v-item>
            <v-item v-else>
              <v-tooltip top max-width="175">
                <template v-slot:activator="{ on }">
                  <span icon v-on="on">
                    <v-icon v-bind:color="acceptingApps ? 'success' : 'error'">
                      {{
                        acceptingApps ? "mdi-sticker-check-outline" : "mdi-sticker-remove-outline"
                      }}
                    </v-icon>
                  </span>
                </template>
                <span v-if="acceptingApps">This project is accepting applications.</span>
                <span v-else>This project is not accepting applications.</span>
              </v-tooltip>
            </v-item>
          </v-list-item>
          <v-divider></v-divider>
          <v-img v-if="coverImg != null" :src="coverImg" height="200"></v-img>
          <v-img
            v-else
            :src="randomCover"
            height="200"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          >
            <v-overlay absolute>
              <v-container class="white--text display-1" v-text="title" />
            </v-overlay>
          </v-img>
          <v-card-text>
            <div v-if="tagline != null" v-text="tagline" class="line-clamp" />
            <!-- <v-chip-group column>
              <v-chip label v-for="tag in tags" :key="tag" style="pointer-events: none;">
                {{ tag }}
              </v-chip>
            </v-chip-group> -->
          </v-card-text>
        </v-item-group>
      </v-container>
      <v-btn icon absolute color="white" style="bottom: 0px; right: 0px;" @click="toggleStarred">
        <v-icon :color="starred ? 'yellow accent-4' : 'grey'">mdi-star</v-icon>
      </v-btn>
    </v-card>
  </v-hover>
</template>

<script>
import apiCall from '@/apiCall';

export default {
  components: {},
  props: {
    item: Object,
    id: String,
    avatar: String,
    title: String,
    starred: Boolean,
    coverImg: String,
    tagline: String,
    tags: Array,
    acceptingApps: Boolean,
  },
  data: () => ({
    maxChar: 250,
  }),
  methods: {
    async toggleStarred() {
      if (!this.starred) {
        const response = await apiCall.methods.post(
          `/users/${this.$store.state.userDetails.cognitoUsername}/stars/${this.id}`,
          '',
          {},
          this.$route.fullPath,
        );
        if (response.status === 200) {
          this.$store.state.userDetails.starred.push(this.item);
        }
      } else {
        const response = await apiCall.methods.delete(
          `/users/${this.$store.state.userDetails.cognitoUsername}/stars/${this.id}`,
          '',
          {},
          this.$route.fullPath,
        );
        if (response.status === 200) {
          const index = this.$store.state.userDetails.starred.map(a => a.id).indexOf(this.id);
          this.$store.state.userDetails.starred.splice(index, 1);
        }
      }
    },
  },
  computed: {
    randomCover() {
      return `https://picsum.photos/766/350?${this.title}`;
    },
    onProject() {
      return this.$store.getters.isAdmin(this.id) || this.$store.getters.isContributor(this.id);
    },
    myApps() {
      return this.$store.state.applications.filter(
        app => app.userId === this.$store.state.userDetails.cognitoUsername,
      );
    },
    alreadyApplied() {
      const myPendingApps = this.myApps.filter(app => app.status === 'PENDING');
      return myPendingApps.map(app => app.projectId).includes(this.id);
    },
  },
};
</script>

<style>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
