<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="applications"
      item-key="id"
      class="elevation-1"
      group-by="projectId"
      :expanded="expanded"
    >
      <template v-slot:item="{ item, expand, isExpanded }">
        <tr style="cursor:pointer;">
          <td @click="$router.push(`/profile/${item.userId}`)">
            <v-avatar size="36" color="primary">
              <v-img v-if="item.thumbnailLink !== undefined" :src="item.thumbnailLink" />
              <v-icon v-else dark>mdi-account-circle</v-icon>
            </v-avatar>
          </td>
          <td @click="$router.push(`/profile/${item.userId}`)">{{ item.userId }}</td>
          <td @click="$router.push(`/profile/${item.userId}`)">
            <v-chip
              label
              :color="
                item.status === 'PENDING'
                  ? 'warning'
                  : item.status === 'ACCEPTED'
                  ? 'success'
                  : 'error'
              "
              style="cursor:pointer;"
            >
              {{ item.status }}
            </v-chip>
          </td>
          <td @click="$router.push(`/profile/${item.userId}`)">
            {{ calendarTime(item.createdAt) }}
          </td>
          <td v-if="item.note !== null">
            <v-btn icon @click="expand(!isExpanded)">
              <v-icon> mdi-chevron-down </v-icon>
            </v-btn>
          </td>
          <td v-else>
            <v-tooltip top max-width="175">
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-format-page-break</v-icon>
              </template>
              <span>This application does not have a note.</span>
            </v-tooltip>
          </td>
          <td>
            <v-dialog max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" color="success">Accept</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  Accept Application?
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-avatar size="36" color="primary">
                      <v-img v-if="item.thumbnailLink !== undefined" :src="item.thumbnailLink" />
                      <span v-else class="white--text headline">
                        {{ item.projectId.substring(0, 1).toLowerCase() }}
                      </span>
                    </v-avatar>
                    {{ item.projectId }}
                    <br />
                    <v-avatar size="36" color="primary">
                      <v-img v-if="item.thumbnailLink !== undefined" :src="item.thumbnailLink" />
                      <v-icon v-else dark>mdi-account-circle</v-icon>
                    </v-avatar>
                    {{ item.userId }}
                  </v-container>
                  <v-btn @click="replyApplication(item, 'ACCEPTED')" color="success">
                    <h2>Accept</h2>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-dialog max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" color="error">Reject</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  Reject Application?
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-avatar size="36" color="primary">
                      <v-img v-if="item.thumbnailLink !== undefined" :src="item.thumbnailLink" />
                      <span v-else class="white--text headline">
                        {{ item.projectId.substring(0, 1).toLowerCase() }}
                      </span>
                    </v-avatar>
                    {{ item.projectId }}
                    <br />
                    <v-avatar size="36" color="primary">
                      <v-img v-if="item.thumbnailLink !== undefined" :src="item.thumbnailLink" />
                      <v-icon v-else dark>mdi-account-circle</v-icon>
                    </v-avatar>
                    {{ item.userId }}
                  </v-container>
                  <v-btn @click="replyApplication(item, 'REJECTED')" color="error">
                    <h2>Reject</h2>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-dialog>
          </td>
        </tr>
      </template>

      <template v-slot:group.header="{ headers, group, toggle, items }">
        <td class="text-left" style="cursor:pointer;" :colspan="headers.length" @click="toggle">
          <v-toolbar dense>
            <v-avatar size="36" color="primary">
              <v-img v-if="items[0].thumbnailLink !== undefined" :src="items[0].thumbnailLink" />
              <span v-else class="white--text headline">
                {{ group.substring(0, 1).toLowerCase() }}
              </span>
            </v-avatar>
            <v-container>
              {{ group }}
            </v-container>
          </v-toolbar>
        </td>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="elevation-1">
          <v-container class="text-left" style="overflow-wrap: break-word;">
            <h4 @click="$router.push(`/profile/${item.userId}`)" style="cursor: pointer;">
              {{ item.userId }}'s Note:
            </h4>
            <v-container style="white-space: pre-line;">
              {{ item.note }}
            </v-container>
          </v-container>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import moment from 'moment';
import apiCall from '@/apiCall';

export default {
  props: {
    applications: Array,
  },
  data() {
    return {
      selectedItem: false,
      expanded: [],
      headers: [
        {
          text: ' ',
          align: 'center',
          value: 'thumbnailLink',
          sortable: false,
        },
        {
          text: 'Name',
          align: 'center',
          value: 'name',
          sortable: false,
        },
        {
          text: 'Status',
          align: 'center',
          value: 'status',
          sortable: false,
        },
        {
          text: 'Created',
          align: 'center',
          value: 'createdAt',
          sortable: false,
        },
        {
          text: 'Note',
          align: 'center',
          value: 'actions',
          width: '50px',
          sortable: false,
        },
        {
          text: 'Actions',
          align: 'center',
          value: 'actions',
          width: '250px',
          sortable: false,
        },
      ],
    };
  },
  methods: {
    calendarTime(dateInput) {
      return moment(dateInput).calendar();
    },
    async replyApplication(item, decision) {
      this.selectItem(item);
      const response = await apiCall.methods.post(
        `/projects/${item.projectId}/applications/${item.id}`,
        '',
        { response: decision },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.selectedItem.status = decision;
        this.$emit('update');
      }
    },
    selectItem(item) {
      this.selectedItem = item;
    },
  },
};
</script>
