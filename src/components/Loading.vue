<template>
  <v-container>
    <br /><br /><br /><br /><br />
    <h1 class="white--text">
      <v-progress-circular
        :size="width"
        width="7"
        color="primary"
        indeterminate
        justify-center
        align-center
      >
        <v-avatar :size="width - 50">
          <v-img contain :src="require('@/../public/assets/logo-border.jpg')" />
        </v-avatar>
      </v-progress-circular>
      <br /><br />{{ value }}
    </h1>
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
