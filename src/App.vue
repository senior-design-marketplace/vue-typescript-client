<template>
  <div id="app">
    <Header></Header>
    <CardDeck></CardDeck>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import CardDeck from './components/CardDeck.vue';

export default {
  name: 'app',
  components: {
    Header,
    CardDeck,
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
