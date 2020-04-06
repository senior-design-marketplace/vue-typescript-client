<template>
  <v-container>
    <Loading v-if="loading && items.length === 0" value="Loading Projects"/>
    <h1 v-else-if="items.length === 0">
      <v-img contain max-height="500" :src="require('@/../public/assets/noResults.svg')" />
      No projects found that match those filters.
    </h1>
    <v-data-table
      v-else
      :headers="headers"
      :items="items"
      :items-per-page="15"
      hide-default-footer
      class="elevation-1"
      item-key="id"
      no-data-text
      :expanded="expanded"
      single-expand
      disable-pagination
    >
      <template v-slot:item="{ item, expand, isExpanded }">
        <tr style="cursor:pointer;">
          <td @click=$router.push(/project/+item.id)>
            <v-avatar
              size="36"
              :color="item.thumbnailLink !== null ? undefined : 'primary'"
            >
              <v-img
                v-if="item.thumbnailLink !== null"
                :src="item.thumbnailLink"
              />
              <span v-else class="white--text headline">
                {{ item.title.substring(0, 1).toLowerCase() }}
              </span>
            </v-avatar>
          </td>
          <td @click=$router.push(/project/+item.id) class="text-left text-break">
            {{ item.title }}
          </td>
          <td @click=$router.push(/project/+item.id) class="text-left text-break">
            {{ item.tagline }}
          </td>
          <td>
            <v-btn icon @click="toggleStarred(item)">
              <v-icon :color="starred(item.id) ? 'yellow accent-4' : 'grey'">mdi-star</v-icon>
            </v-btn>
          </td>
          <td @click=$router.push(/project/+item.id)>
            <v-tooltip v-if="onProject(item.id)" top max-width="175">
              <template v-slot:activator="{ on }">
                <span icon v-on="on">
                  <v-icon color="primary">mdi-account-check</v-icon>
                </span>
              </template>
              <span>You are a member of this project.</span>
            </v-tooltip>
            <v-tooltip v-else-if="alreadyApplied(item.id)" top max-width="175">
              <template v-slot:activator="{ on }">
                <span icon v-on="on">
                  <v-icon color="warning">mdi-sticker-minus-outline</v-icon>
                </span>
              </template>
              <span>You have a pending application to this project.</span>
            </v-tooltip>
            <v-tooltip v-else top max-width="175">
              <template v-slot:activator="{ on }">
                <span icon v-on="on">
                  <v-icon v-bind:color="item.acceptingApplications ? 'success' : 'error'">
                    {{
                      item.acceptingApplications
                      ? "mdi-sticker-check-outline"
                      : "mdi-sticker-remove-outline"
                    }}
                  </v-icon>
                </span>
              </template>
              <span v-if="item.acceptingApplications">
                This project is accepting applications.
              </span>
              <span v-else>This project is not accepting applications.</span>
            </v-tooltip>
          </td>
          <td>
            <v-btn  icon @click="expand(!isExpanded)">
              <v-icon> mdi-chevron-down </v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="elevation-1" style="border-left: 2mm solid #03A9F5;">
          <v-container class="text-left text-break">
            <v-img
              class="mx-1 my-1"
              style="float:left;"
              height="250"
              width="300"
              :src="item.coverLink"
            />
            <v-container class="mx-1 text-left">{{ item.body }}</v-container>
          </v-container>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Loading from '@/components/Loading.vue';
import apiCall from '@/apiCall';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      expanded: [],
      headers: [
        {
          text: ' ',
          align: 'left',
          sortable: false,
        },
        {
          text: 'Title',
          align: 'left',
          width: '150px',
          sortable: false,
          value: 'title',
        },
        {
          text: 'Tagline',
          align: 'left',
          sortable: false,
          value: 'tagline',
        },
        {
          text: 'Starred',
          align: 'center',
          width: '50px',
          sortable: false,
        },
        {
          text: 'Status',
          align: 'center',
          width: '50px',
          sortable: false,
        },
        {
          text: 'More',
          align: 'center',
          width: '50px',
          sortable: false,
        },
      ],
    };
  },
  props: {
    items: Array,
    loading: Boolean,
  },
  methods: {
    onProject(projectId) {
      return this.$store.getters.isAdmin(projectId) || this.$store.getters.isContributor(projectId);
    },
    alreadyApplied(projectId) {
      const myPendingApps = this.myApps.filter(app => app.status === 'PENDING');
      return myPendingApps.map(app => app.projectId).includes(projectId);
    },
    starred(value) {
      return this.$store.getters.isStarred(value);
    },
    async toggleStarred(item) {
      if (!this.starred(item.id)) {
        const response = await apiCall.methods.post(
          `/users/${this.$store.state.userDetails.cognitoUsername}/stars/${item.id}`,
          '',
          {},
          this.$route.fullPath,
        );
        if (response.status === 200) {
          this.$store.state.userDetails.starred.push(item);
        }
      } else {
        const response = await apiCall.methods.delete(
          `/users/${this.$store.state.userDetails.cognitoUsername}/stars/${item.id}`,
          '',
          {},
          this.$route.fullPath,
        );
        if (response.status === 200) {
          const index = this.$store.state.userDetails.starred.map(a => a.id).indexOf(item.id);
          this.$store.state.userDetails.starred.splice(index, 1);
        }
      }
    },
  },
  computed: {
    myApps() {
      return this.$store.state.applications.filter(
        app => app.userId === this.$store.state.userDetails.cognitoUsername,
      );
    },
  },
};
</script>
