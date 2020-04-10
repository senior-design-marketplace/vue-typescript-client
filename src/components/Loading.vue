<template>
  <v-container>
    <br /><br /><br /><br /><br />
    <v-progress-circular :size="width" width="7" color="primary" indeterminate>
      <v-avatar :size="width - 50">
        <v-img contain :src="require('@/../public/assets/logo-border.jpg')" />
      </v-avatar>
    </v-progress-circular>
    <br /><br />
    <v-sheet :style="$store.state.darkmode ? 'background-color: #121212;' : ''">
      <h1>{{ value }}</h1>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  props: {
    value: String,
  },
  computed: {
    width() {
      return Math.min(window.innerWidth / 2, 400);
    },
  },
};
</script>
