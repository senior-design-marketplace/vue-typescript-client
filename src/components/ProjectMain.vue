<template>
  <div>
    <v-card>
      <v-toolbar flat>
        <v-img :src="avatar" max-height="50" max-width="50"></v-img>
        <v-toolbar-title style=" font-family: Montserrat, font-size: 30px" v-text="title"></v-toolbar-title>
      </v-toolbar>
      <v-img :src="coverImg" contain max-height="350"></v-img>
    </v-card>
    <v-card>
      <v-row>
        <v-col>
          <v-list-item-title class="headline text-left">Description:</v-list-item-title>
          <v-list-item class="text-left" v-text="description"></v-list-item>
          <v-list-item-title class="headline text-left">Majors Required:</v-list-item-title>
          <v-chip-group column>
            <v-chip
              label
              v-for="major in majors"
              :key="major[0]"
              class="noClick"
            >{{major[0] +": "+ major[1]}}</v-chip>
          </v-chip-group>
          <v-list-item-title class="headline text-left">Tags:</v-list-item-title>
          <v-chip-group column>
            <v-chip label v-for="tag in tags" :key="tag" class="noClick">{{tag}}</v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
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
.logo {
  width: 50px;
  height: 50px;
}
</style>