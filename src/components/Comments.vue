<template>
  <v-card>
    <v-container>
      <v-list-item-title class="headline text-left">Comments:</v-list-item-title>
      <v-card flat max-height="700" class="overflow-y-auto">
        <v-container v-for="comment in comments" :key="comment.author">
          <v-card>
            <v-list>
              <v-list-item>
                <v-col cols="4" sm="2" md="1">
                  <v-avatar color="black">
                    <v-icon dark>mdi-account-circle</v-icon>
                  </v-avatar>
                </v-col>
                <v-col>
                  <v-list-item-content>
                    <v-list-item-title>{{comment.author}}</v-list-item-title>
                    <v-list-item-subtitle>{{comment.datetime}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-col>
              </v-list-item>
            </v-list>
            <v-container>{{comment.text}}</v-container>
          </v-card>
        </v-container>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    comments: Array
  }
};
</script>