<template>
  <div>
    <v-toolbar>
      <v-toolbar-title class="montserrat"><img src="../assets/logo.png">marqetplace.</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-btn text>Projects</v-btn>
        <v-btn text>My Projects</v-btn>
        <v-btn text>Create Project</v-btn>
        <v-btn text>Applications</v-btn>
        <v-btn text>About</v-btn>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default {
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:100');

.montserrat {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
}
img {
    width: 50px;
}
</style>