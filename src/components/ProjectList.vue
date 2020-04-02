<template>
  <v-container>
    <Loading v-if="loading" value="Loading Projects"/>
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
      loading-text="Loading projects..."
      :expanded="expanded"
      single-expand
      disable-pagination
      :loading="loading"
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
          <!-- <td>
            <v-chip-group column>
              <v-chip label v-for="tag in item.tags" :key="tag" class="noClick">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </td> -->
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
        <td :colspan="headers.length" class="elevation-1">
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
          text: 'Accepting Applications',
          align: 'center',
          sortable: false,
          value: 'acceptionApps',
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
