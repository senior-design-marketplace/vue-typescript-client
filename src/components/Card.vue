<template :id="id">
  <v-card min-width="350" max-width="350" min-height="200" class="mx-auto">
    <v-container class="pa-1">
      <v-item-group>
        <v-list-item>
          <v-list-item-avatar tile>
            <v-img v-if="avatar != null" :src="avatar"></v-img>
            <span v-else class="black--text headline" v-text="title.substring(0,1)"></span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-flex class="headline" v-text="title"></v-flex>
            <v-list-item-subtitle v-if="advisors != null" v-text="advisors.join(', ')"></v-list-item-subtitle>
          </v-list-item-content>
          <v-item v-slot:default="{ active, toggle }">
            <v-btn icon @click="toggle">
              <v-icon v-bind:color="active ? 'yellow accent-4' : 'gray'">mdi-star</v-icon>
            </v-btn>
          </v-item>
        </v-list-item>
        <v-divider></v-divider>
        <v-img v-if="img != null" :src="img" height="194"></v-img>
        <v-card-text>
          <div v-if="desc != null">
            <div v-if="desc.length < maxChar" v-text="desc"></div>
            <div v-else v-text="desc.substring(0,maxChar)+'...'"></div>
          </div>
          <v-chip-group column>
            <v-chip label v-for="tag in tags" :key="tag" class="noClick">{{tag}}</v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-actions>
          <Project
            v-bind:title="title"
            v-bind:avatar="avatar"
            v-bind:img="img"
            v-bind:advisors="advisors"
            v-bind:desc="desc"
            v-bind:starred="starred"
            v-bind:tags="tags"
            v-bind:members="members"
            v-bind:contact="contact"
          ></Project>
        </v-card-actions>
      </v-item-group>
    </v-container>
  </v-card>
</template>

<script>
import Project from "../components/Project.vue";

export default {
  components: {
    Project
  },
  props: {
    id: String,
    title: String,
    avatar: String,
    img: String,
    advisors: Array,
    members: Array,
    desc: String,
    starred: Boolean,
    tags: Array,
    contact: String
  },
  data: () => ({
    maxChar: 250
  })
};
</script>

<style>
.noClick {
  pointer-events: none;
}
</style>