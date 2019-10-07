<template>
  <v-toolbar dark height="100">
    <img class="logo" :src="require('../assets/logo.png')"/>
    <img :src="require('../assets/title.png')" height="50px"/>
    <!--<v-toolbar-title class="title">&nbsp;marqetplace.</v-toolbar-title>-->
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text class="item">Projects</v-btn>
      <v-btn text class="item">My Projects</v-btn>
      <v-btn text class="item">Create Project</v-btn>
      <v-btn text class="item">Applications</v-btn>
      <v-btn text class="item">About</v-btn>
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
</template>

<script>
export default {
};
</script>

<style>
.title {
  font-family: 'Montserrat', sans-serif; 
  font-size: 30px !important;
  font-weight: bold;
}
.item {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px !important;
  font-weight: bold !important;
}
.logo {
    width: 50px;
    height: 50px
}
</style>