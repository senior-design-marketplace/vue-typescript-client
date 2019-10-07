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
          <v-toolbar-title v-text="title"></v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
      </v-card>
    </v-dialog>
  </v-row>
</template> 

<script>
  export default {
    props: {
      title: String,
    },
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>