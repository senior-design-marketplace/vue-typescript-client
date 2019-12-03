<template>
  <v-toolbar dark height="100">
    <router-link to="/">
      <img class="logo" :src="require('@/../public/assets/logo.png')" />

      <img :src="require('@/../public/assets/title.png')" height="50px" />
    </router-link>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text class="item" to="/">Projects</v-btn>
      <v-btn text class="item" to="/my-projects">My Projects</v-btn>
      <v-btn text class="item" to="/create">Create Project</v-btn>
      <v-btn text class="item" to="/applications">Applications</v-btn>
      <v-btn text class="item" to="/about">About</v-btn>
    </v-toolbar-items>
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn icon to="/account">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
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
