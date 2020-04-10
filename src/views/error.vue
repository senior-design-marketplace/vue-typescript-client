<template>
  <v-container>
    <v-img
      class="white--text"
      contain
      max-height="500"
      :src="require('@/../public/assets/500.svg')"
    />
    <v-sheet>
      <h1>
        {{ $route.params.type }} Error
        <br />
        <span v-if="$route.params.text !== 'undefined'">
          {{ $route.params.text }}
        </span>
      </h1>
    </v-sheet>
  </v-container>
</template>
