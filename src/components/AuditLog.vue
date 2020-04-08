<template>
  <v-container fluid style="max-width: 800px;">
    <v-data-table
      :items="history"
      :expanded.sync="expanded"
      item-key="id"
      :items-per-page="15"
      class="elevation-1"
    >
      <template v-slot:item="{ item, expand, isExpanded }">
        <tr @click="expand(!isExpanded)" style="cursor: pointer;" class="text-left">
          <td>
            <b>{{ displayType(item.type) }}</b> by {{ item.initiateId }}
            <br />
            {{ calendarTime(item.createdAt) }}
          </td>
          <td>
            <v-btn v-if="!isExpanded" icon>
              <v-icon> mdi-chevron-right </v-icon>
            </v-btn>
            <v-btn v-else icon>
              <v-icon> mdi-chevron-down </v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <tr class="elevation-1">
          <td :colspan="headers.length" style="border-left: 2mm solid #03a9f5;">
            <v-container v-if="item.type === 'PROJECT_CREATED'" class="text-left">
              Title: {{ item.after.title }} <br />
              Tagline: {{ item.after.tagline }} <br />
              Description: {{ item.after.body }}
              <v-icon v-if="item.after.body === null"> mdi-close </v-icon><br />
              Accepting Applications:
              <v-icon> {{ item.after.acceptingApplications ? "mdi-check" : "mdi-close" }} </v-icon>
            </v-container>

            <v-container
              v-else-if="item.type === 'PROJECT_UPDATED'"
              :colspan="headers.length"
              class="text-left"
            >
              <span v-if="differenceKey(item.before, item.after) === 'title'">
                <b>Title</b> updated from "{{ item.before.title }}" <br />
                <b>to</b> "{{ item.after.title }}"
              </span>
              <span v-else-if="differenceKey(item.before, item.after) === 'tagline'">
                <b>Tagline</b> updated from "{{ item.before.tagline }}" <br />
                <b>to</b> "{{ item.after.tagline }}"
              </span>
              <span v-else-if="differenceKey(item.before, item.after) === 'body'">
                <b>Description</b> updated from "{{ item.before.body }}" <br />
                <b>to</b> "{{ item.after.body }}"
              </span>
              <span v-else-if="differenceKey(item.before, item.after) === 'acceptingApplications'">
                <span v-if="!item.after.acceptingApplications"> Not </span>
                Accepting Applications
                <v-icon>
                  {{ item.after.acceptingApplications ? "mdi-check" : "mdi-close" }}
                </v-icon>
              </span>
            </v-container>

            <v-container
              v-else-if="item.type === 'APPLICATION_CREATED'"
              :colspan="headers.length"
              class="text-left"
            >
              Name: {{ item.after.userId }} <br />
              Status: {{ item.after.status }} <br />
              Note: {{ item.after.note }}
              <v-icon v-if="item.after.note === null"> mdi-close </v-icon>
            </v-container>

            <v-container
              v-else-if="
                item.type === 'APPLICATION_ACCEPTED' || item.type === 'APPLICATION_REJECTED'
              "
              :colspan="headers.length"
              class="text-left"
            >
              Name: {{ item.after.userId }} <br />
              Status: {{ item.after.status }}<br />
              Note: {{ item.after.note }}
              <v-icon v-if="item.after.note === null"> mdi-close </v-icon>
            </v-container>

            <v-container
              v-else-if="item.type === 'ENTRY_CREATED'"
              :colspan="headers.length"
              class="text-left"
            >
              Board Entry Type: {{ item.after.document.mediaType }} <br />
              <span v-if="item.after.document.type === 'TEXT'">
                Body: {{ item.after.document.body }}
              </span>
              <span v-else>
                <v-img
                  v-if="item.after.document.mediaType === 'IMAGE'"
                  :src="item.after.document.mediaLink"
                  min-height="350"
                  max-height="350"
                  contain
                />
                <VuePlyr
                  v-else-if="item.after.document.mediaType === 'VIDEO'"
                  :emit="['enterfullscreen', 'exitfullscreen']"
                  @enterfullscreen="fullscreen = true"
                  @exitfullscreen="fullscreen = false"
                >
                  <video
                    :src="item.after.document.mediaLink"
                    :style="!fullscreen ? 'max-height:350px;' : ''"
                  />
                </VuePlyr>
              </span>
            </v-container>

            <v-container
              v-else-if="item.type === 'ENTRY_UPDATED'"
              :colspan="headers.length"
              class="text-left"
            >
              <b>Board entry</b> that was created {{ calendarTime(item.before.createdAt) }} updated
              from "{{ item.before.document.body }}" <br />
              <b>to </b> "{{ item.after.document.body }}"
            </v-container>

            <v-container
              v-else-if="item.type === 'ENTRY_DELETED'"
              :colspan="headers.length"
              class="text-left"
            >
              Board Entry Type: {{ item.before.document.mediaType }} <br />
              <span v-if="item.before.document.type === 'TEXT'">
                Body: {{ item.before.document.body }}
              </span>
              <span v-else>
                <v-img
                  v-if="item.before.document.mediaType === 'IMAGE'"
                  :src="item.before.document.mediaLink"
                  min-height="350"
                  max-height="350"
                  contain
                />
                <VuePlyr
                  v-else-if="item.before.document.mediaType === 'VIDEO'"
                  :emit="['enterfullscreen', 'exitfullscreen']"
                  @enterfullscreen="fullscreen = true"
                  @exitfullscreen="fullscreen = false"
                >
                  <video
                    :src="item.before.document.mediaLink"
                    :style="!fullscreen ? 'max-height:350px;' : ''"
                  />
                </VuePlyr>
              </span>
            </v-container>

            <v-container v-else :colspan="headers.length" class="text-left">
              More info about {{ item.id }}
            </v-container>
          </td>
          <td />
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { diff } from 'deep-object-diff';
import moment from 'moment';
import VuePlyr from 'vue-plyr';
import axios from 'axios';

export default {
  components: {
    VuePlyr,
  },
  props: {
    history: Array,
  },
  data() {
    return {
      expanded: [],
      fullscreen: false,
    };
  },
  methods: {
    displayType(type) {
      switch (type) {
        case 'PROJECT_CREATED':
          return 'Project Created';
        case 'PROJECT_UPDATED':
          return 'Project Updated';
        case 'APPLICATION_CREATED':
          return 'Application Created';
        case 'APPLICATION_ACCEPTED':
          return 'Application Accepted';
        case 'APPLICATION_REJECTED':
          return 'Application Rejected';
        case 'ENTRY_CREATED':
          return 'Board Entry Created';
        case 'ENTRY_UPDATED':
          return 'Board Entry Updated';
        case 'ENTRY_DELETED':
          return 'Board Entry Deleted';
        default:
          return type;
      }
    },
    differenceKey(lhs, rhs) {
      if (diff(lhs, rhs) === null) return null;
      return Object.keys(diff(lhs, rhs))[0];
    },
    calendarTime(dateInput) {
      return moment(dateInput).calendar();
    },
    async addMediaTypes() {
      const linksArr = [];
      for (let i = 0; i < this.history.length; i += 1) {
        if (
          this.history[i].type === 'ENTRY_CREATED'
          && this.history[i].after.document.mediaType === undefined
          && this.history[i].after.document.type === 'MEDIA'
        ) {
          linksArr.push(this.history[i].after.document.mediaLink);
        }
      }
      const resp = axios.all(linksArr.map(l => axios.get(l))).then(
        axios.spread((...res) => {
          const types = res.map(a => a.headers['content-type']);
          for (let i = 0; i < this.history.length; i += 1) {
            if (
              this.history[i].type === 'ENTRY_CREATED'
              && this.history[i].after.document.mediaType === undefined
              && this.history[i].after.document.type === 'MEDIA'
            ) {
              if (types.shift() === 'video/mp4') {
                this.$set(this.history[i].after.document, 'mediaType', 'VIDEO');
              } else {
                this.$set(this.history[i].after.document, 'mediaType', 'IMAGE');
              }
            }
          }
        }),
      );
    },
  },
  mounted() {
    this.addMediaTypes();
  },
};
</script>
