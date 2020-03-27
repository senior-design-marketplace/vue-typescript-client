<template>
  <v-container>
    <h1>
      <v-img contain max-height="500" :src="require('@/../public/assets/500.svg')" />
      {{ $route.params.type }} Error:
      <br />
      {{ $route.params.text }}
    </h1>
  </v-container>
</template>
