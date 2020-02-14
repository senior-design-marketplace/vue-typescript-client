<template>
  <v-app>
    <div id="app" v-on="pullToken()">
      <Header />
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
      <v-footer app padless class="font-weight-medium"> token: {{ token }} </v-footer>
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
  computed: {
    token() {
      return store.state.id_token;
    },
  },
  methods: {
    pullToken() {
      if (this.$route.hash.startsWith('#access_token=')) {
        const token = /&id_token=(.*?)&/gm.exec(this.$route.hash)[1];
        store.commit('setToken', token);
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
