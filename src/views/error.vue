<template>
  <v-container>
    <h1>
      <v-img contain max-height="500" :src="require('@/../public/assets/500.svg')" />
      {{ $route.params.type }} Error
      <br />
      <span v-if="$route.params.text !== 'undefined'">
        {{ $route.params.text }}
      </span>
    </h1>
  </v-container>
</template>
