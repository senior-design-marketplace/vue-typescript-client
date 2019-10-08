<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Read More</v-btn>
      </template>
      <v-card>
        <v-toolbar @click="dialog = false" dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title style=" font-family: Montserrat, font-size: 30px" v-text="title"></v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-item-group>
          <v-list-item>
            <v-list-item-content>
              <v-img :src="img" height="350"></v-img>
              <v-list-item-title class="headline text-left">Advisors</v-list-item-title>
              <v-list-item class="text-left" v-if="advisors != null" v-text="advisors.toString()"></v-list-item>
              <v-list-item-title class="headline text-left">Members</v-list-item-title>
              <v-list-item class="text-left" v-if="members != null" v-text="members.toString()"></v-list-item>
              <v-list-item-title class="headline text-left">Description</v-list-item-title>
              <v-list-item class="text-left" v-text="desc"></v-list-item>
              <v-list-item-title class="headline text-left">Contact</v-list-item-title>
              <v-list-item class="text-left" v-text="contact"></v-list-item>
              <v-list-item-title class="headline text-left">Tags</v-list-item-title>
              <v-chip-group column>
                <v-chip label v-for="tag in tags" :key="tag" class="noClick">{{tag}}</v-chip>
              </v-chip-group>
            </v-list-item-content>
          </v-list-item>

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
      </v-card>
    </v-dialog>
  </v-row>
</template> 

<script>
export default {
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