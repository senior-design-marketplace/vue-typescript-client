<template>
  <v-card>
    <v-container>
      <v-treeview :items="nestedComments" open-all>
        <template v-slot:label="{ item }">
          <v-card class="text-left">
            <v-card-title class="subtitle-2">
              {{ relativeTime(item.createdAt) }} by {{ item.userId }}
              <v-spacer />
              <v-btn v-if="isLoggedIn && replies !== item.id" icon @click="editReply(item.id)">
                <v-icon>mdi-reply</v-icon>
              </v-btn>
              <v-btn v-else-if="isLoggedIn" icon @click="editReply(item.id)">
                <v-icon>mdi-cancel</v-icon>
              </v-btn>

              <v-btn
                v-if="edits !== item.id && isLoggedIn && (isAdmin || postedComment(item.id))"
                icon
                @click="editEdit(item.id)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                v-else-if="isLoggedIn && (isAdmin || postedComment(item.id))"
                icon
                @click="editEdit(item.id)"
              >
                <v-icon>mdi-cancel</v-icon>
              </v-btn>

              <v-dialog v-if="isLoggedIn && (isAdmin || postedComment(item.id))" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    Delete comment and all replies?
                  </v-card-title>
                  <v-card-text>
                    <v-treeview :items="new Array(item)">
                      <template v-slot:label="{ item }">
                        <v-card class="text-left">
                          <v-card-title class="subtitle-2">
                            {{ relativeTime(item.createdAt) }} by {{ item.userId }}
                          </v-card-title>
                          <v-container v-text="item.body" />
                        </v-card>
                        <v-divider inset />
                      </template>
                    </v-treeview>
                    <v-btn @click="deleteComment(item.id)">
                      <h2>Delete</h2>
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card-title>
            <v-container v-if="edits !== item.id" v-text="item.body" />
            <v-container v-else>
              <v-textarea
                class="mx-1"
                rows="5"
                counter="256"
                label="Edit"
                :placeholder="item.body"
                outlined
                v-model="editText"
                :rules="[rules.length(256)]"
              />
              <v-row justify="end">
                <v-btn @click="editComment(item.id, editText)" :disabled="commentInvalid(editText)"
                  >Edit</v-btn
                >
              </v-row>
            </v-container>
            <v-container v-if="replies === item.id">
              <v-textarea
                class="mx-1"
                rows="5"
                counter="256"
                label="Reply"
                outlined
                v-model="replyText"
                :rules="[rules.length(256)]"
              />
              <v-row justify="end">
                <v-btn
                  @click="replyComment(item.id, replyText)"
                  :disabled="commentInvalid(replyText)"
                  >Reply</v-btn
                >
              </v-row>
            </v-container>
          </v-card>
          <v-divider inset />
        </template>
      </v-treeview>
      <br />
      <v-container style="max-width: 700px;">
        <v-textarea
          v-model="comment"
          outlined
          name="newComment"
          label="New Comment"
          counter="256"
          :rules="[rules.length(256)]"
        ></v-textarea>
        <v-row justify="end">
          <v-btn :disabled="commentInvalid(comment)" @click="postComment()">Submit</v-btn>
        </v-row>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
import uuid from 'uuid/v4';
import moment from 'moment';
import apiCall from '@/apiCall';

export default {
  props: {
    comments: Array,
    isAdmin: Boolean,
  },
  data() {
    return {
      id: uuid(),
      comment: null,
      replyText: null,
      editText: null,
      edits: null,
      replies: null,
      rules: {
        length: len => v => (v || '').length <= len || `Invalid character length, must be less than ${len}`,
      },
    };
  },
  methods: {
    relativeTime(dateInput) {
      return moment(dateInput).fromNow();
    },
    editReply(id) {
      if (this.replies !== id) {
        this.replies = id;
      } else {
        this.replies = null;
      }
      this.replyText = null;
    },
    editEdit(id) {
      if (this.edits !== id) {
        this.edits = id;
      } else {
        this.edits = null;
      }
      const index = this.comments.map(entry => entry.id).indexOf(id);
      this.editText = this.comments[index].body;
    },
    postedComment(id) {
      const index = this.comments.map(entry => entry.id).indexOf(id);
      if (this.comments[index] === undefined) return false;
      return this.comments[index].userId === this.$store.state.userDetails.cognitoUsername;
    },
    commentInvalid(body) {
      return body === null || body === undefined || body.length === 0 || body.length > 256;
    },
    async postComment() {
      const response = await apiCall.methods.post(
        `/projects/${this.$route.params.id}/comments`,
        '',
        {
          id: this.id,
          body: this.comment,
        },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.id = uuid();
        this.comment = '';
        this.$emit('update');
      }
    },
    async replyComment(parent, text) {
      const response = await apiCall.methods.post(
        `/projects/${this.$route.params.id}/comments/${parent}`,
        '',
        {
          id: this.id,
          body: text,
        },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.id = uuid();
        this.editReply(parent);
        this.$emit('update');
      }
    },
    async editComment(id, newbody) {
      const response = await apiCall.methods.patch(
        `/projects/${this.$route.params.id}/comments/${id}`,
        '',
        {
          body: newbody,
        },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.$emit('update');
      }
    },
    async deleteComment(id) {
      const response = await apiCall.methods.delete(
        `/projects/${this.$route.params.id}/comments/${id}`,
        '',
        {},
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.$emit('update');
      }
    },
  },
  watch: {
    comments() {},
    nestedComments() {},
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    nestedComments() {
      if (this.comments === undefined) return [];
      const list = this.comments;
      const map = {};
      let node;
      const roots = [];
      let i;
      for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i;
        list[i].children = [];
        list[i].edit = list[i].body;
        list[i].reply = null;
        node = list[i];
        if (node.parentId !== null) {
          list[map[node.parentId]].children.push(node);
        } else {
          roots.push(node);
        }
      }
      return roots;
    },
  },
};
</script>
