<template>
  <v-card>
    <v-container>
      <h2>Comments:</h2>
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
                    <v-list-item-title>{{ comment.author }}</v-list-item-title>
                    <v-list-item-subtitle>{{ comment.datetime }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-col>
              </v-list-item>
            </v-list>
            <v-container>{{ comment.text }}</v-container>
          </v-card>
        </v-container>
      </v-card>
      <br />
      <v-textarea
        v-model="comment"
        outlined
        name="newComment"
        label="New Comment"
        counter="256"
        :rules="[rules.length(256)]"
      ></v-textarea>
      <v-container>
        <v-row justify="end">
          <v-btn
            :disabled="this.comment.length == 0 || this.comment.length > 256"
            @click="submitComment()"
            >Submit</v-btn
          >
        </v-row>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    comments: Array,
  },
  data() {
    return {
      comment: '',
      rules: {
        length: len => v => (v || '').length <= len || `Invalid character length, must be less than ${len}`,
      },
    };
  },
  methods: {
    submitComment() {
      this.$emit('comment', this.comment);
      this.comment = '';
    },
  },
};
</script>