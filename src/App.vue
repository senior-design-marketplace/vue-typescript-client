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
import apiCall from '@/apiCall';
import Header from '@/components/Header.vue';

export default {
  name: 'app',
  components: {
    Header,
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
        // console.log(token);
      } else {
        this.getRootData();
        // console.log('No Token Found');
      }
    },
    async getRootData() {
      const response = await apiCall.methods.get('/', '', this.$route.fullPath);
      if (response.status === 200) {
        this.$store.commit('setMajors', response.data.majors);
        this.$store.commit('setTags', response.data.tags);
        if (response.data.userDetails !== undefined) {
          this.$store.commit('setNotifications', response.data.notifications);
          this.$store.commit('setApplications', response.data.applications);
          this.$store.commit('updateUserDetail', {
            detail: 'bio',
            value: response.data.userDetails.bio,
          });
          this.$store.commit('updateUserDetail', {
            detail: 'cognitoUsername',
            value: response.data.userDetails.id,
          });
          this.$store.commit('updateUserDetail', {
            detail: 'thumbnailLink',
            value: response.data.userDetails.thumbnailLink,
          });
          this.$store.commit('updateUserDetail', {
            detail: 'contributorOn',
            value: response.data.userDetails.contributorOn,
          });
          this.$store.commit('updateUserDetail', {
            detail: 'administratorOn',
            value: response.data.userDetails.administratorOn,
          });
        } else if (this.$store.getters.isLoggedIn && process.env.NODE_ENV === 'production') {
          this.$store.commit('setsavePath', this.$route.fullPath);
          window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
        }
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
