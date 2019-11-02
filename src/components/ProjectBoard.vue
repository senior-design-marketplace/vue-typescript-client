<template>
  <v-card>
    <v-item-group>
      <v-list-item>
        <v-list-item-content>
          <h2 class="text-left">Project Board:</h2>
        </v-list-item-content>
      </v-list-item>
    </v-item-group>
    <v-container fluid>
      <v-data-iterator :items="boardItems" :items-per-page="50" hide-default-footer>
        <template v-slot:default="props">
          <v-timeline :reverse="false" dense>
            <v-timeline-item v-for="item in boardItems" :key="item.date">
              <v-card class="elevation-2">
                <v-card-title class="headline" v-text="item.date"></v-card-title>
                <v-card-text class="text-left" v-text="item.desc"></v-card-text>
                <v-img v-for="pic in item.img" :key="pic" height="350" :src="pic"></v-img>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </template>
      </v-data-iterator>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    boardItems: Array
  }
};
</script>