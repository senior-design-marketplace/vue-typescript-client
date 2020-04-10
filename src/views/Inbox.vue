<template>
  <div>
    <v-toolbar class="d-none d-md-flex d-flex justify-center">
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="view" multiple>
        <v-btn value="unread">
          <v-badge
            overlap
            color="primary"
            offset-x="7.5"
            offset-y="7.5"
            :content="unread.length"
            :value="unread.length"
          >
            <v-icon>mdi-email</v-icon>
          </v-badge>
        </v-btn>
        <v-btn value="read">
          <v-badge
            overlap
            color="primary"
            offset-x="7.5"
            offset-y="7.5"
            :content="read.length"
            :value="read.length"
          >
            <v-icon>mdi-email-open</v-icon>
          </v-badge>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <br />
    <v-container style="max-width: 1185px;">
      <v-sheet
        v-if="read.length === 0 && unread.length === 0"
        :style="$store.state.darkmode ? 'background-color: #121212;' : ''"
      >
        <h1>
          <v-img contain max-height="500" :src="require('@/../public/assets/noProjects.svg')" />
          You have never received a notification!
        </h1>
      </v-sheet>
      <v-sheet
        v-else-if="unread.length === 0 && !view.includes('read')"
        :style="$store.state.darkmode ? 'background-color: #121212;' : ''"
      >
        <h1>
          <v-img contain max-height="500" :src="require('@/../public/assets/noResults.svg')" />
          You're all caught up!
        </h1>
      </v-sheet>
      <v-sheet
        v-else-if="view.length === 0"
        :style="$store.state.darkmode ? 'background-color: #121212;' : ''"
      >
        <h1>
          <v-img contain max-height="500" :src="require('@/../public/assets/noResults.svg')" />
          No notifications found that match those filters.
        </h1>
      </v-sheet>
      <v-data-table
        v-else
        :items="notifications"
        :expanded.sync="expanded"
        item-key="id"
        class="elevation-1"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:item="{ item, expand, isExpanded }">
          <tr
            v-if="(view.includes('unread') && !item.read) || (view.includes('read') && item.read)"
            class="text-left"
          >
            <v-list-item
              v-if="
                item.document.type === 'APPLICATION' &&
                  item.document.application.userId === $store.state.userDetails.cognitoUsername
              "
            >
              <v-list-item-content style="cursor: pointer;" @click="handleApplication(item)">
                <v-list-item-title v-if="item.document.application.status == 'PENDING'">
                  {{ displayType(item.document.type) }} sent to
                  {{ item.document.application.projectId }}
                </v-list-item-title>
                <v-list-item-title v-else>
                  {{ displayType(item.document.type) }} to
                  {{ item.document.application.projectId }} has been
                  {{ item.document.application.status }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ calendarTime(item.createdAt) }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn icon :value="isExpanded" @click="expand(!isExpanded)">
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              <v-list-item-icon>
                <v-tooltip top max-width="175">
                  <template v-slot:activator="{ on }">
                    <v-checkbox
                      v-on="on"
                      :input-value="item.read"
                      @click.stop="toggleRead(item.id, item.read)"
                    />
                  </template>
                  <span>Mark as {{ item.read ? "unread" : "read" }}</span>
                </v-tooltip>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item
              v-else-if="
                item.document.type === 'APPLICATION' &&
                  item.document.application.userId !== $store.state.userDetails.cognitoUsername
              "
            >
              <v-list-item-content style="cursor: pointer;" @click="handleApplication(item)">
                <v-list-item-title v-if="item.document.application.status === 'PENDING'">
                  {{ displayType(item.document.type) }} from
                  {{ item.document.application.userId }} for
                  {{ item.document.application.projectId }} received
                </v-list-item-title>
                <v-list-item-title v-else>
                  {{ displayType(item.document.type) }} from
                  {{ item.document.application.userId }} for
                  {{ item.document.application.projectId }} has been
                  {{ item.document.application.status }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ calendarTime(item.createdAt) }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn icon :value="isExpanded" @click="expand(!isExpanded)">
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              <v-list-item-icon>
                <v-tooltip top max-width="175">
                  <template v-slot:activator="{ on }">
                    <v-checkbox
                      v-on="on"
                      :input-value="item.read"
                      @click.stop="toggleRead(item.id, item.read)"
                    />
                  </template>
                  <span>Mark as {{ item.read ? "unread" : "read" }}</span>
                </v-tooltip>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item v-else>
              <v-list-item-content style="cursor: pointer;">
                <v-list-item-title>
                  {{ displayType(item.document.type) }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ calendarTime(item.createdAt) }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn icon :value="isExpanded" @click="expand(!isExpanded)">
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              <v-list-item-icon>
                <v-tooltip top max-width="175">
                  <template v-slot:activator="{ on }">
                    <v-checkbox
                      v-on="on"
                      :input-value="item.read"
                      @click.stop="toggleRead(item.id, item.read)"
                    />
                  </template>
                  <span>Mark as {{ item.read ? "unread" : "read" }}</span>
                </v-tooltip>
              </v-list-item-icon>
            </v-list-item>
          </tr>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <tr
            v-if="(view.includes('unread') && !item.read) || (view.includes('read') && item.read)"
          >
            <td style="border-left: 2mm solid #03a9f5;">
              <v-container v-if="item.document.type === 'APPLICATION'" class="text-left">
                Project: {{ item.document.application.projectId }} <br />
                <span v-if="item.document.application.status === 'PENDING'"
                  >Status: Pending<br
                /></span>
                <span v-else>
                  Status: {{ item.document.application.status }} by
                  {{ item.document.application.responderId }}<br />
                </span>
                Note: {{ item.document.application.note }}
                <v-icon v-if="item.document.application.note === null"> mdi-close </v-icon>
              </v-container>

              <v-container v-else :colspan="headers.length" class="text-left">
                More info about {{ item.id }}
              </v-container>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment';
import apiCall from '@/apiCall';

export default {
  data() {
    return {
      view: ['unread'],
      expanded: [],
    };
  },
  methods: {
    displayType(type) {
      switch (type) {
        case 'APPLICATION':
          return 'Application';
        default:
          return type;
      }
    },
    calendarTime(dateInput) {
      return moment(dateInput).calendar();
    },
    handleApplication(notif) {
      if (notif.document.application.status === 'PENDING') {
        this.$router.push(`/applications/${notif.document.application.id}`).catch((err) => {});
      } else {
        this.$router.push(`/project/${notif.document.application.projectId}`).catch((err) => {});
      }
      this.toggleRead(notif.id, false);
    },
    async toggleRead(id, currentValue) {
      const response = await apiCall.methods.patch(
        `/users/${this.$store.state.userDetails.cognitoUsername}/notifications/${id}`,
        '',
        { read: !currentValue },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        const index = this.$store.state.notifications.map(a => a.id).indexOf(id);
        this.$store.state.notifications.splice(index, 1, response.data);
      }
    },
  },
  computed: {
    notifications() {
      return this.$store.state.notifications;
    },
    read() {
      return this.notifications.filter(a => a.read);
    },
    unread() {
      return this.notifications.filter(a => !a.read);
    },
  },
};
</script>
