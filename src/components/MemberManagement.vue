<template>
  <v-container fluid style="max-width: 800px;">
    <v-data-table :headers="headers" :items="members" :custom-sort="customSort" class="elevation-1">
      <template v-slot:item="{ item }">
        <tr>
          <td>
            <v-avatar size="30" :color="item.thumbnailLink !== null ? undefined : 'primary'">
              <v-img v-if="item.thumbnailLink !== null" :src="item.thumbnailLink" />
              <v-icon v-else dark>mdi-account-circle</v-icon>
            </v-avatar>
          </td>
          <td
            @click="$router.push(`/profile/${item.id}`)"
            style="cursor: pointer;"
            class="text-left"
          >
            {{ item.firstName }} {{ item.lastName }}
          </td>
          <td
            @click="$router.push(`/profile/${item.id}`)"
            style="cursor: pointer;"
            class="text-left"
          >
            {{ item.id }}
          </td>
          <td>
            <v-icon :color="isAdvisor(item.id) ? 'purple darken-2' : 'grey lighten-1'">
              mdi-school
            </v-icon>
          </td>
          <td>
            <v-tooltip v-if="isAdmin(item.id) && administrators.length === 1" top max-width="175">
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" color="yellow darken-2">
                  mdi-crown
                </v-icon>
              </template>
              <span>There must be at least one admin on a project</span>
            </v-tooltip>

            <v-btn v-else icon @click="toggleAdmin(item.id)">
              <v-icon :color="isAdmin(item.id) ? 'yellow darken-2' : 'grey lighten-1'">
                mdi-crown
              </v-icon>
            </v-btn>
          </td>
          <td>
            <v-dialog
              v-model="kickDialog"
              max-width="500px"
              v-if="item.id !== $store.state.userDetails.cognitoUsername"
            >
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon>
                  <v-icon>
                    mdi-account-remove
                  </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title> Kick Member? </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-avatar size="36" color="primary">
                      <v-img v-if="item.thumbnailLink !== undefined" :src="item.thumbnailLink" />
                      <v-icon v-else dark>mdi-account-circle</v-icon>
                    </v-avatar>
                    <span class="title"> {{ item.firstName }} {{ item.lastName }} </span>
                  </v-container>
                  <v-btn @click="kickMember(item.id)" color="error">
                    <h2>Kick</h2>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-dialog>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import moment from 'moment';
import apiCall from '@/apiCall';

export default {
  props: {
    contributors: Array,
    administrators: Array,
  },
  data() {
    return {
      kickDialog: false,
      headers: [
        {
          text: ' ',
          align: 'left',
          width: '50px',
          sortable: false,
        },
        {
          text: 'Name',
          align: 'center',
          value: 'lastName',
        },
        {
          text: 'ID',
          align: 'center',
          value: 'id',
        },
        {
          text: 'Advisor',
          align: 'center',
          width: '100px',
          value: 'advisor',
        },
        {
          text: 'Administrator',
          align: 'center',
          width: '130px',
          value: 'admin',
        },
        {
          text: 'Kick',
          align: 'center',
          width: '50px',
          sortable: false,
        },
      ],
    };
  },
  methods: {
    calendarTime(dateInput) {
      return moment(dateInput).calendar();
    },
    isContributor(personId) {
      if (this.members === undefined) return [];
      return this.contributors.map(admin => admin.id).includes(personId);
    },
    isAdmin(personId) {
      if (this.members === undefined) return [];
      return this.administrators.map(admin => admin.id).includes(personId);
    },
    isAdvisor(personId) {
      if (this.members === undefined) return [];
      return this.members
        .filter(member => member.roles.includes('faculty'))
        .map(admin => admin.id)
        .includes(personId);
    },
    customSort(items, index, isDesc) {
      items.sort((a, b) => {
        if (index[0] === 'advisor') {
          if (!isDesc[0]) {
            return this.isAdvisor(a.id) ? -1 : 1;
          }
          return this.isAdvisor(b.id) ? -1 : 1;
        }
        if (index[0] === 'admin') {
          if (!isDesc[0]) {
            return this.isAdmin(a.id) ? -1 : 1;
          }
          return this.isAdmin(b.id) ? -1 : 1;
        }
        if (!isDesc[0]) {
          return a[index] < b[index] ? -1 : 1;
        }
        return b[index] < a[index] ? -1 : 1;
      });
      return items;
    },
    async toggleAdmin(userId) {
      this.editAcceptingApps = true;
      const response = await apiCall.methods.patch(
        `/projects/${this.$route.params.id}/members/${userId}`,
        '',
        {
          role: this.isAdmin(userId) ? 'CONTRIBUTOR' : 'ADMINISTRATOR',
          isAdvisor: this.isAdvisor(userId),
        },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.$emit('update');
      }
    },
    async kickMember(userId) {
      this.editAcceptingApps = true;
      const response = await apiCall.methods.delete(
        `/projects/${this.$route.params.id}/members/${userId}`,
        '',
        {},
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.$emit('update');
        this.kickDialog = false;
      }
    },
  },
  computed: {
    members() {
      if (this.administrators === undefined || this.contributors === undefined) {
        return [];
      }
      return this.administrators.concat(this.contributors);
    },
  },
};
</script>
