<template :id="id">
  <v-hover v-slot:default="{ hover }">
    <v-card min-width="350" max-width="350" min-height="350" class="mx-auto" :to=/project/+id
    :elevation="hover ? 12 : 2" :ripple="false">
      <v-container class="pa-1">
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
            <!-- <v-item v-slot:default="{ active, toggle }">
              <v-btn icon @click="toggle">
                <v-icon v-bind:color="active ? 'yellow accent-4' : 'grey'">mdi-star</v-icon>
              </v-btn>
            </v-item> -->
            <v-item v-if="onProject">
              <v-tooltip top max-width="175">
                <template v-slot:activator="{ on }">
                  <span icon v-on="on">
                    <v-icon color="primary">mdi-account-check</v-icon>
                  </span>
                </template>
                <span>You are a member of {{ title }}.</span>
              </v-tooltip>
            </v-item>
            <v-item v-else-if="alreadyApplied">
              <v-tooltip top max-width="175">
                <template v-slot:activator="{ on }">
                  <span icon v-on="on">
                    <v-icon color="warning">mdi-sticker-minus-outline</v-icon>
                  </span>
                </template>
                <span>You have a pending application to {{ title }}.</span>
              </v-tooltip>
            </v-item>
            <v-item v-else>
              <v-tooltip top max-width="175">
                <template v-slot:activator="{ on }">
                  <span icon v-on="on">
                    <v-icon v-bind:color="acceptingApps ? 'success' : 'error'">
                      {{
                        acceptingApps
                        ? "mdi-sticker-check-outline"
                        : "mdi-sticker-remove-outline"
                      }}
                    </v-icon>
                  </span>
                </template>
                <span v-if="acceptingApps">{{ title }} is accepting applications.</span>
                <span v-else>{{ title }} is not accepting applications.</span>
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
            <div v-if="tagline != null">
              <div v-text="tagline"></div>
            </div>
            <v-chip-group column>
              <v-chip label v-for="tag in tags" :key="tag" class="noClick">{{ tag }}</v-chip>
            </v-chip-group>
          </v-card-text>
        </v-item-group>
      </v-container>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  components: {},
  props: {
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
.noClick {
  pointer-events: none;
}
</style>
