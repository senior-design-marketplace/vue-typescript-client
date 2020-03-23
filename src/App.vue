<template>
  <v-app>
    <div id="app">
      <Header />
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
  </v-app>
</template>

<script>
import apiCall from '@/apiCall';
import Header from '@/components/Header.vue';

export default {
  name: 'app',
  components: {
    Header,
  },
  updated() {
    this.pullToken();
  },
  methods: {
    pullToken() {
      if (this.$route.hash.startsWith('#access_token=')) {
        const token = /&id_token=(.*?)&/gm.exec(this.$route.hash)[1];
        this.$store.commit('updateUserDetail', { detail: 'token', value: token });
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        this.$store.commit('updateUserDetail', {
          detail: 'firstName',
          value: decodedToken.given_name,
        });
        this.$store.commit('updateUserDetail', {
          detail: 'lastName',
          value: decodedToken.family_name,
        });
        this.$store.commit('updateUserDetail', {
          detail: 'id',
          value: decodedToken.identities[0].userId,
        });
        this.$store.commit('updateUserDetail', { detail: 'email', value: decodedToken.email });
        this.$store.commit('updateUserDetail', {
          detail: 'role',
          value: decodedToken['custom:roles'],
        });
        if (this.$store.state.savePath !== '') {
          this.$router.push({ path: this.$store.state.savePath, hash: '' }).catch((err) => {});
        } else {
          this.$router.push({ hash: '' }).catch((err) => {});
        }
      } else {
        this.getRootData();
      }
    },
    async getRootData() {
      await apiCall.methods
        .get('/', '', this.$route.fullPath)
        .then((response) => {
          if (response.status === 200) {
            this.$store.commit('setMajors', response.data.majors);
            this.$store.commit('setTags', response.data.tags);
            if (response.data.id !== undefined) {
              this.$store.commit('setNotifications', response.data.notifications);
              this.$store.commit('setApplications', response.data.applications);
              this.$store.commit('updateUserDetail', {
                detail: 'bio',
                value: response.data.bio,
              });
              this.$store.commit('updateUserDetail', {
                detail: 'cognitoUsername',
                value: response.data.id,
              });
              this.$store.commit('updateUserDetail', {
                detail: 'thumbnailLink',
                value: response.data.thumbnailLink,
              });
              this.$store.commit('updateUserDetail', {
                detail: 'contributorOn',
                value: response.data.contributorOn,
              });
              this.$store.commit('updateUserDetail', {
                detail: 'administratorOn',
                value: response.data.administratorOn,
              });
            } else if (this.$store.getters.isLoggedIn) {
              this.$store.commit('setsavePath', this.$route.fullPath);
              apiCall.methods.authError();
            }
          }
        })
        .catch((error) => {
          this.$store.commit('logout');
          apiCall.methods.otherError('Error logging in to Marqetplace.');
        });
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
