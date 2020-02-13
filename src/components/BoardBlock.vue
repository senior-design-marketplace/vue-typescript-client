<template>
  <v-card class="elevation-2">
    <v-card-title class="headline" v-text="date"></v-card-title>
    <v-card-text class="text-left" v-text="desc"></v-card-text>
    <v-img v-for="pic in img" :key="pic" height="350" :src="pic"></v-img>
  </v-card>
</template>

<script>
export default {
  props: {
    date: String,
    desc: String,
    img: Array,
  },
};
</script>
