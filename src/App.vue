<template>
  <v-app>
    <div id="app">
      <Header></Header>
      <CardDeck></CardDeck>
      <Project></Project>
    </div>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import CardDeck from './components/CardDeck.vue';
import Project from './components/Project.vue';

export default {
  name: 'app',
  components: {
    Header,
    CardDeck,
    Project,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:100');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
</style>
