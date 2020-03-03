<template>
  <v-app>
    <div id="app" v-on="pullToken()">
      <Header />
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue';
import store from '@/store';

export default {
  name: 'app',
  components: {
    Header,
  },
  methods: {
    pullToken() {
      if (this.$route.hash.startsWith('#access_token=')) {
        const token = /&id_token=(.*?)&/gm.exec(this.$route.hash)[1];
        store.commit('setToken', token);
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        store.commit('setFirstName', decodedToken.given_name);
        store.commit('setLastName', decodedToken.family_name);
        store.commit('setUserId', decodedToken.identities[0].userId);
        store.commit('setCognitoUsername', decodedToken['cognito:username']);
        store.commit('setEmail', decodedToken.email);
        store.commit('setRole', decodedToken['custom:roles']);
        if (store.state.savePath !== '') {
          this.$router.push({ path: store.state.savePath, hash: '' }).catch((err) => {});
          store.commit('resetSavePath');
        } else {
          this.$router.push({ hash: '' }).catch((err) => {});
        }
        // console.log(token);
      } else {
        // console.log('No Token Found');
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:100");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
</style>
