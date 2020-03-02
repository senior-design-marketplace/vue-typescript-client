<template>
  <v-toolbar dark height="100">
    <router-link to="/">
      <img class="logo" :src="require('@/../public/assets/logo.png')" />

      <img :src="require('@/../public/assets/title.png')" height="50px" />
    </router-link>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text class="item" to="/">Projects</v-btn>
      <v-btn v-if="isLoggedIn" text class="item" to="/my-projects">My Projects</v-btn>
      <v-btn v-if="isLoggedIn" text class="item" to="/create">Create Project</v-btn>
      <v-btn v-if="isLoggedIn" text class="item" to="/applications">Applications</v-btn>
      <v-btn text class="item" to="/about">About</v-btn>
      <v-btn v-if="!isLoggedIn" @click="login" text class="item">Login</v-btn>
    </v-toolbar-items>
    <v-menu v-if="isLoggedIn" open-on-hover transition="slide-y-transition" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu v-if="isLoggedIn" open-on-hover transition="slide-y-transition" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
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
  </v-toolbar>
</template>

<script>
import store from '@/store';
import router from '../router';

export default {
  data: () => ({
    items: [
      { title: 'Notification 1' },
      { title: 'Notification 2' },
      { title: 'Notification 3' },
      { title: 'Notification 4' },
    ],
  }),
  methods: {
    logout() {
      store.commit('logout');
      this.$router.push('/').catch((err) => {});
    },
    login() {
      store.commit('setsavePath', this.$route.fullPath);
      window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
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
