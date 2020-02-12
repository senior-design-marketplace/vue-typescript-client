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

export default {
  name: 'app',
  components: {
    Header,
  },
  methods: {
    pullToken() {
      if (this.$route.hash.startsWith('#access_token=')) {
        const token = /&id_token=(.*?)&/gm.exec(this.$route.hash)[1];
        localStorage.setItem('id_token', token);
        this.$router.push({ hash: '' }).catch((err) => {});
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
