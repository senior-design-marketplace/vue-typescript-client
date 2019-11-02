<template>
  <div>
    <v-toolbar>
      <v-img v-if="avatar != null" :src="avatar" max-height="50" max-width="50"></v-img>&nbsp;&nbsp;&nbsp;&nbsp;
      <h2 class="text-left">{{title}}</h2>
      <v-item-group>
        <v-list-item>
          <v-item v-slot:default="{ active, toggle }">
            <v-btn icon @click="toggle">
              <v-icon v-bind:color="active ? 'yellow accent-4' : 'gray'">mdi-star</v-icon>
            </v-btn>
          </v-item>
        </v-list-item>
      </v-item-group>
    </v-toolbar>
    <p />
    <v-card>
      <v-img :src="coverImg" contain max-height="350"></v-img>
    </v-card>
    <p />
    <v-card>
      <v-container>
        <h2 class="text-left">Description:</h2>
        <v-list-item class="text-left" v-text="description"></v-list-item>
        <br />
        <h2 class="text-left">Majors:</h2>
        <v-chip-group column>
          <v-chip label v-for="major in majors" :key="major" class="noClick">{{major}}</v-chip>
        </v-chip-group>
        <br />
        <h2 class="text-left">Tags:</h2>
        <v-chip-group column>
          <v-chip label v-for="tag in tags" :key="tag" class="noClick">{{tag}}</v-chip>
        </v-chip-group>
      </v-container>
    </v-card>
  </div>
</template> 

<script>
export default {
  props: {
    avatar: String,
    title: String,
    starred: Boolean,
    coverImg: String,
    description: String,
    majors: Array,
    tags: Array
  }
};
</script>

<style>
.noClick {
  pointer-events: none;
}
</style>