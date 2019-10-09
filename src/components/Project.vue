<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Read More</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title @click="dialog = false" style=" font-family: Montserrat, font-size: 30px" v-text="title"></v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-btn>
            Apply
          </v-btn>
        </v-toolbar>
        <v-img :src="img" height="350"></v-img>
        <v-row>
          <v-col :cols="9">
            <v-list-item-title class="headline text-left">Description:</v-list-item-title>
            <v-list-item class="text-left" v-text="desc"></v-list-item>
            <v-list-item-title class="headline text-left">Tags:</v-list-item-title>
            <v-chip-group column>
              <v-chip label v-for="tag in tags" :key="tag" class="noClick">{{tag}}</v-chip>
            </v-chip-group>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col>
            <v-list-item-title class="headline text-left">Advisors:</v-list-item-title>
            <v-list-item class="text-left" v-if="advisors != null" v-text="advisors.join(', ')"></v-list-item>
            <v-divider></v-divider>
            <v-list-item-title class="headline text-left">Members:</v-list-item-title>
            <v-list-item class="text-left" v-if="members != null" v-text="members.join(', ')"></v-list-item>
            <v-divider></v-divider>
            <v-list-item-title class="headline text-left">Contact:</v-list-item-title>
            <v-list-item class="text-left" v-text="contact"></v-list-item>
          </v-col>
        </v-row>
        <v-item-group>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline text-left">Project Board</v-list-item-title>
              <ProjectBoard></ProjectBoard>
            </v-list-item-content>
          </v-list-item>
        </v-item-group>
      </v-card>
    </v-dialog>
  </v-row>
</template> 

<script>
import ProjectBoard from "../components/ProjectBoard.vue";
export default {
  components: {
    ProjectBoard
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
  data() {
    return {
      dialog: false
    };
  }
};
</script>