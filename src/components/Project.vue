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
        </v-toolbar> <!--this is where you put the project data in-->
              <v-img :src=img></v-img> 
              <p class="text-left">
              Description:              
                <v-img :desc=desc>{{desc}}</v-img> 
              Advisors:
                <v-img :advisors=advisors>{{advisors}}</v-img> 
               </p>
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
        desc: String,
        starred: Boolean,
        tags: Array,
    },
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>