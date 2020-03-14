<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="15"
      hide-default-footer
      class="elevation-1"
      item-key="id"
      no-data-text="No projects found that match those filters"
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
          <td @click=$router.push(/project/+item.id) class="text-left">
            {{ item.title }}
          </td>
          <td @click=$router.push(/project/+item.id) class="text-left">
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
              <span>You are a member of {{ item.title }}</span>
            </v-tooltip>
            <v-tooltip v-else-if="item.acceptingApplications" top max-width="175">
              <template v-slot:activator="{ on }">
                <span icon v-on="on">
                  <v-icon color="success">mdi-sticker-check-outline</v-icon>
                </span>
              </template>
              <span>{{ item.title }} is accepting applications.</span>
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
          <v-container style="overflow-wrap: break-word;">
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
import apiCall from '@/apiCall';

export default {
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
  },
};
</script>
