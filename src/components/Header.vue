<template>
  <v-toolbar dark height="100">
    <router-link to="/">
      <img class="logo" :src="require('@/../public/assets/logo.png')" />

      <img :src="require('@/../public/assets/title.png')" height="50px" />
    </router-link>
    <!--<v-toolbar-title class="title">&nbsp;marqetplace.</v-toolbar-title>-->
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <router-link to="/">
        <v-btn text class="item">Projects</v-btn>
      </router-link>
      <router-link to="/my-projects">
        <v-btn text class="item">My Projects</v-btn>
      </router-link>
      <router-link to="/create">
        <v-btn text class="item">Create Project</v-btn>
      </router-link>
      <router-link to="/applications">
        <v-btn text class="item">Applications</v-btn>
      </router-link>
      <router-link to="/about">
        <v-btn text class="item">About</v-btn>
      </router-link>
    </v-toolbar-items>
    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <router-link to="/account">
        <v-btn icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </router-link>
    </template>
  </v-toolbar>
</template>

<script>
export default {};
</script>

<style>
.title {
  font-family: "Montserrat", sans-serif;
  font-size: 30px !important;
  font-weight: bold;
}
.item {
  font-family: "Montserrat", sans-serif;
  font-size: 15px !important;
  font-weight: bold !important;
}
.logo {
  width: 50px;
  height: 50px;
}
</style>