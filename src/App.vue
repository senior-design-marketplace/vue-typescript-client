<template>
  <div id="app">
    <Header></Header>
    <Card class="card"
      v-bind:title=title
      v-bind:avatar=avatar
      v-bind:advisors=advisors
      v-bind:desc=desc
      v-bind:starred=starred
      v-bind:tags=tags
    ></Card>
    <CardHover class="card"
      v-bind:title=title
      v-bind:avatar=avatar
      v-bind:advisors=advisors
      v-bind:desc=desc
      v-bind:starred=starred
      v-bind:tags=tags
    ></CardHover>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Card from './components/Card.vue';
import CardHover from './components/CardHover.vue';

export default {
  name: 'app',
  components: {
    Header,
    Card,
    CardHover,
  },
  data: () => ({
    title: "Test Card",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    advisors: ['Advisor 1', 'Advisor 2'],
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    starred: true,
    tags: ['Computer Science', 'Software Engineering', 'Engineering Management'],
  }),
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
.card {
  margin:25px;
}
</style>
