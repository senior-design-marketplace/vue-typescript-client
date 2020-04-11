<template>
  <v-card @click="$router.push(`/profile/${userDetails.id}`)">
    <v-list-item>
      <v-tooltip v-if="isAdmin && isAdvisor" top max-width="175">
        <template v-slot:activator="{ on }">
          <v-badge color="yellow darken-2" icon="mdi-crown" overlap offset-x="18" offset-y="7">
            <v-badge color="purple darken-2" icon="mdi-school" overlap offset-x="7" offset-y="18">
              <v-avatar
                size="50"
                :color="userDetails.thumbnailLink !== null ? undefined : 'primary'"
                v-on="on"
              >
                <v-img v-if="userDetails.thumbnailLink !== null" :src="userDetails.thumbnailLink" />
                <v-icon v-else dark>mdi-account-circle</v-icon>
              </v-avatar>
            </v-badge>
          </v-badge>
        </template>
        <span>Administrator and advisor of this project.</span>
      </v-tooltip>
      <v-tooltip v-else-if="isAdmin" top max-width="175">
        <template v-slot:activator="{ on }">
          <v-badge color="yellow darken-2" icon="mdi-crown" overlap>
            <v-avatar
              size="50"
              :color="userDetails.thumbnailLink !== null ? undefined : 'primary'"
              v-on="on"
            >
              <v-img v-if="userDetails.thumbnailLink !== null" :src="userDetails.thumbnailLink" />
              <v-icon v-else dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-badge>
        </template>
        <span>Administrator of this project.</span>
      </v-tooltip>
      <v-tooltip v-else-if="isAdvisor" top max-width="175">
        <template v-slot:activator="{ on }">
          <v-badge color="purple darken-2" icon="mdi-school" overlap>
            <v-avatar
              size="50"
              :color="userDetails.thumbnailLink !== null ? undefined : 'primary'"
              v-on="on"
            >
              <v-img v-if="userDetails.thumbnailLink !== null" :src="userDetails.thumbnailLink" />
              <v-icon v-else dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-badge>
        </template>
        <span>Advisor of this project.</span>
      </v-tooltip>
      <v-avatar
        v-else
        size="50"
        :color="userDetails.thumbnailLink !== null ? undefined : 'primary'"
      >
        <v-img v-if="userDetails.thumbnailLink !== null" :src="userDetails.thumbnailLink" />
        <v-icon v-else dark>mdi-account-circle</v-icon>
      </v-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ userDetails.firstName }} {{ userDetails.lastName }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ userDetails.email }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <div class="line-clamp">
        {{ userDetails.bio !== null ? userDetails.bio : "No Bio" }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    userDetails: Object,
    isAdmin: Boolean,
    isAdvisor: Boolean,
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
