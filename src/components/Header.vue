<template>
  <div>
    <v-app-bar dark height="100" color="secondary">
      <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-lg-none"></v-app-bar-nav-icon>
        <v-container>
          <router-link to="/">
            <v-img
              :src="require('@/../public/assets/header.jpg')"
              :aspect-ratio="6.71906355"
              max-height="75"
              max-width="504"
            />
          </router-link>
        </v-container>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-lg-flex">
        <v-btn text class="item" to="/">Projects</v-btn>
        <v-btn v-if="isLoggedIn" text class="item" to="/my-projects">My Projects</v-btn>
        <v-btn v-if="isLoggedIn" text class="item" to="/create">Create Project</v-btn>
        <v-btn v-if="isLoggedIn" text class="item" to="/applications">Applications</v-btn>
        <v-btn text class="item" to="/about">About</v-btn>
        <v-btn v-if="!isLoggedIn" @click="login" text class="item">Login</v-btn>
      </v-toolbar-items>
      <div class="d-none d-lg-flex">
        <v-menu v-if="isLoggedIn && notifications.length > 0" open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <span v-on="on">
              <v-btn icon >
                <v-badge color="red" overlap :content="notifications.length">
                  <v-icon>mdi-bell</v-icon>
                </v-badge>
              </v-btn>
            </span>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in notifications" :key="index">
              <v-btn :to=/project/+item.document.application.projectId >
                {{ item.document.type }}status:{{ item.document.application.status }}
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-tooltip v-else-if="isLoggedIn && notifications.length === 0" top max-width="175">
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" class="mx-3">mdi-bell</v-icon>
          </template>
          <span>No notifications!</span>
        </v-tooltip>

        <v-menu v-if="isLoggedIn" open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <span v-on="on">
              <v-btn icon to="/account">
                <v-list-item-avatar to="/account" icon class="mx-1" style="cursor:pointer;">
                  <v-img
                    v-if="$store.state.userDetails.thumbnailLink !== null"
                    :src="$store.state.userDetails.thumbnailLink"
                  />
                  <v-icon v-else>mdi-account-circle</v-icon>
                </v-list-item-avatar>
              </v-btn>
            </span>
          </template>
          <v-list>
            <v-list-item to="/account">
              <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-toolbar v-if="isLoggedIn" class="px-2" to="/account" dark color="secondary">
        <v-list-item-avatar>
          <v-img
                v-if="$store.state.userDetails.thumbnailLink !== null"
                :src="$store.state.userDetails.thumbnailLink"
              />
              <v-icon v-else>mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ name }}</v-list-item-title>
      </v-toolbar>

      <v-toolbar v-else class="px-2" dark color="secondary">
        <v-list-item-title tile>
          <v-img contain :src="require('@/../public/assets/header.png')" />
        </v-list-item-title>
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Projects</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="isLoggedIn" to="/my-projects">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>My Projects</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="isLoggedIn" to="/create">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Create Project</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="isLoggedIn" to="/applications">
          <v-list-item-icon>
            <v-icon>mdi-file-multiple</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Applications</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-menu v-if="isLoggedIn" open-on-click transition="slide-y-transition" offset-y>
          <template v-slot:activator="{ on }">
            <v-list-item link v-on="on">
              <v-list-item-icon>
                <v-icon>mdi-bell</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Notifications</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in notifications" :key="index">
              <v-list-item-title :to="`projects/${item.document.application.projectId}`"
                >{{ item.document.type }} status:
                {{ item.document.application.status }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>

        <v-list-item link to="/about">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="isLoggedIn" to="/account">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>My Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="!isLoggedIn" @click="login">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="isLoggedIn" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('/').catch((err) => {});
    },
    login() {
      this.$store.commit('setsavePath', this.$route.fullPath);
      window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    name() {
      return `${this.$store.state.userDetails.firstName} ${this.$store.state.userDetails.lastName}`;
    },
    notifications() {
      return this.$store.state.notifications;
    },
  },
};
</script>

<style>
.item {
  font-family: "Montserrat", sans-serif;
  font-size: 15px !important;
  font-weight: bold !important;
}
</style>
