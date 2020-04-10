<template>
  <v-container>
    <v-img contain max-height="500" :src="require('@/../public/assets/404.svg')" />
    <v-sheet :style="$store.state.darkmode ? 'background-color: #121212;' : ''">
      <h1>404 Error<br />Not Found</h1>
    </v-sheet>
  </v-container>
</template>
