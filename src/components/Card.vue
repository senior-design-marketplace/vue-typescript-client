<template :id="id">
  <v-hover v-slot:default="{ hover }">
    <v-card min-width="350" max-width="350" min-height="350" class="mx-auto" :to=/project/+id
    :elevation="hover ? 12 : 2">
      <v-container class="pa-1">
        <v-item-group>
          <v-list-item>
            <v-list-item-avatar v-if="avatar != null">
              <v-img :src="avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-avatar v-else-if="title != null" color="primary">
              <span class="white--text headline" v-text="title.substring(0, 1).toLowerCase()" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-flex class="headline" v-text="title"></v-flex>
            </v-list-item-content>
            <!-- <v-item v-slot:default="{ active, toggle }">
                  <v-btn icon @click="toggle">
                    <v-icon v-bind:color="active ? 'yellow accent-4' : 'gray'">mdi-star</v-icon>
                  </v-btn>
                </v-item> -->
          </v-list-item>
          <v-divider></v-divider>
          <v-img v-if="coverImg != null" :src="coverImg" height="194"></v-img>
          <v-card-text>
            <div v-if="tagline != null">
              <div v-text="tagline"></div>
            </div>
            <v-chip-group column>
              <v-chip label v-for="tag in tags" :key="tag" class="noClick">{{ tag }}</v-chip>
            </v-chip-group>
          </v-card-text>
        </v-item-group>
      </v-container>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  components: {},
  props: {
    id: String,
    avatar: String,
    title: String,
    starred: Boolean,
    coverImg: String,
    tagline: String,
    tags: Array,
  },
  data: () => ({
    maxChar: 250,
  }),
};
</script>

<style>
.noClick {
  pointer-events: none;
}
</style>
