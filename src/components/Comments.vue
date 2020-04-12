<template>
  <v-card>
    <v-container>
      <v-treeview :items="nestedComments" open-all :open="shown" expand-icon>
        <template v-slot:prepend="{ item }">
          <div
            flat
            :style="
              `
              position: absolute;
              top: 0;
              overflow: visible;
              height: ${barLength(item.id)}px;
              width: 35px;
              cursor: pointer;
              z-index: 2;
              border-left: 3mm solid ${indentColor(item.indent)};
              border-top: 1px solid ${indentColor(item.indent)};
              border-bottom: 1px solid ${indentColor(item.indent)};
            `
            "
            @click="toggleHide(item.id)"
          >
            <v-icon small :class="shown.includes(item.id) ? 'my-2' : 'my-4'">
              {{ shown.includes(item.id) ? "mdi-minus" : "mdi-plus" }}
            </v-icon>
          </div>
        </template>
        <template v-slot:label="{ item, open }">
          <v-card
            class="text-left"
            :style="
              `
              position:relative;
              left: -3px;
              border-bottom: 1px solid ${indentColor(item.indent)};
              border-top: 1px solid ${indentColor(item.indent)};
            `
            "
          >
            <v-card-title class="subtitle-2">
              <span
                @click="$router.push(`/profile/${item.userId}`)"
                style="cursor: pointer;"
                v-text="`${relativeTime(item.createdAt)} by ${item.userId}`"
              />
              <v-spacer />
              <div v-if="open || shown.includes(item.id)">
                <v-btn v-if="isLoggedIn && replies !== item.id" icon @click="editReply(item.id)">
                  <v-icon>mdi-reply</v-icon>
                </v-btn>
                <v-btn v-else-if="isLoggedIn" icon @click="editReply(item.id)">
                  <v-icon>mdi-cancel</v-icon>
                </v-btn>

                <v-btn
                  v-if="edits !== item.id && isLoggedIn && postedComment(item.id)"
                  icon
                  @click="editEdit(item.id)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  v-else-if="isLoggedIn && postedComment(item.id)"
                  icon
                  @click="editEdit(item.id)"
                >
                  <v-icon>mdi-cancel</v-icon>
                </v-btn>

                <v-dialog
                  v-if="isLoggedIn && (isAdmin || postedComment(item.id))"
                  max-width="500px"
                >
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
                            <v-container v-text="item.body" style="white-space: pre-line;" />
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
              </div>
            </v-card-title>
            <v-container
              v-if="(open || shown.includes(item.id)) && edits !== item.id"
              v-text="item.body"
              style="white-space: pre-line;"
            />
            <div
              v-else-if="open || shown.includes(item.id)"
              class="mb-3"
              style="max-width: 700px; left: 0px;"
            >
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
            </div>
            <div
              v-if="(open || shown.includes(item.id)) && replies === item.id"
              class="mb-3"
              style="max-width: 700px;"
            >
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
            </div>
          </v-card>
        </template>
      </v-treeview>
      <br />
      <v-card flat style=" z-index: 3;">
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
      </v-card>
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
      shown: [],
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
    indentColor(indent) {
      const steps = 12;
      const r = (3 / steps) * (12 - indent) + 0;
      const g = (169 / steps) * (12 - indent) + 9;
      const b = (245 / steps) * (12 - indent) + 12;
      return `rgb(${r},${g},${b})`;
    },
    barLength(id) {
      let length = 56;
      if (this.shown.includes(id)) {
        length += 62;
        if (this.replies === id) {
          length += 228;
        }
        if (this.edits === id) {
          length += 180;
        }
      }
      return length;
    },
    toggleHide(id) {
      const index = this.shown.indexOf(id);
      if (index === -1) this.shown.push(id);
      else this.shown.splice(index, 1);
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
  mounted() {
    this.shown = this.comments.map(a => a.id);
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
          node.indent = list[map[node.parentId]].indent + 1;
          list[map[node.parentId]].children.push(node);
        } else {
          node.indent = 0;
          roots.push(node);
        }
      }
      return roots;
    },
  },
};
</script>
