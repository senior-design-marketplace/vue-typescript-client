<template>
  <div>
    <v-app-bar dark height="100">
      <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-lg-none"></v-app-bar-nav-icon>
      <router-link to="/">
        <img class="logo" :src="require('@/../public/assets/logo.png')" />
        <img :src="require('@/../public/assets/title.png')" height="50px" />
      </router-link>
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
            <v-btn tile icon v-on="on">
              <v-tab>
                <v-badge color="red" overlap :content="notifications.length">
                  <v-icon>mdi-bell</v-icon>
                </v-badge>
              </v-tab>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in notifications" :key="index">
              <v-btn :to=/project/+item.document.application.projectId >
                {{ item.document.type }}status:{{ item.document.application.status }}
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu v-if="isLoggedIn" open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-list-item-avatar to="/account" icon v-on="on" class="mx-1" style="cursor:pointer;">
              <v-img
                v-if="$store.state.userDetails.thumbnailLink !== null"
                :src="$store.state.userDetails.thumbnailLink"
              />
              <v-icon v-else>mdi-account-circle</v-icon>
            </v-list-item-avatar>
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
      <v-list-item v-if="isLoggedIn" class="px-2" to="/account">
        <v-list-item-avatar>
          <v-img
                v-if="$store.state.userDetails.thumbnailLink !== null"
                :src="$store.state.userDetails.thumbnailLink"
              />
              <v-icon v-else>mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ name }}</v-list-item-title>
      </v-list-item>

      <v-list-item v-else class="px-2">
        <v-list-item-avatar tile>
          <img class="logo" :src="require('@/../public/assets/logo.png')" />
        </v-list-item-avatar>
        <v-list-item-title>marqetplace.</v-list-item-title>
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

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
.title {
  font-family: "Montserrat", sans-serif;
  font-size: 30px !important;
  font-weight: bold;
}
.item {
  font-family: "Montserrat", sans-serif;
  font-size: 15px !important;
  font-weight: bold !important;
}
.logo {
  width: 50px;
  height: 50px;
}
</style>
