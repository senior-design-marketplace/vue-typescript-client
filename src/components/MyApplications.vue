<template>
  <v-container>
    <h2>My Applications</h2>
    <v-data-table
      :headers="headers"
      :items="applications"
      item-key="id"
      disable-pagination
      class="elevation-1"
      :expanded="expanded"
      hide-default-footer
    >
      <template v-slot:item="{ item, expand, isExpanded }">
        <tr style="cursor:pointer;">
          <td @click=$router.push(/project/+item.projectId)>
            <v-avatar size="36" color="primary">
              <v-img v-if="item.thumbnailLink !== undefined" :src="item.thumbnailLink" />
              <span v-else class="white--text headline">
                {{ item.projectId.substring(0, 1).toLowerCase() }}
              </span>
            </v-avatar>
          </td>
          <td @click=$router.push(/project/+item.projectId)>{{ item.projectId }}</td>
          <td @click=$router.push(/project/+item.projectId)>
            <v-chip
            label
            :color="item.status==='PENDING'?'yellow accent-3'
            :item.status==='ACCEPTED'?'success':'error'"
            style="cursor:pointer;"
            >
              {{ item.status }}
            </v-chip>
          </td>
          <td @click=$router.push(/project/+item.projectId)>{{ new Date(item.createdAt) }}</td>
          <td @click=$router.push(/project/+item.projectId)>{{ new Date(item.updatedAt) }}</td>
          <td v-if="item.note !== null">
            <v-btn  icon @click="expand(!isExpanded)">
              <v-icon> mdi-chevron-down </v-icon>
            </v-btn>
          </td>
          <td v-else>
            <v-tooltip top max-width="175">
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" color="error">mdi-close</v-icon>
              </template>
              <span>You did not include a note on this application.</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-container style="overflow-wrap: break-word;">{{ item.note }}</v-container>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  props: {
    applications: Array,
  },
  data() {
    return {
      expanded: [],
      headers: [
        {
          text: ' ',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Project',
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
          text: 'Last Updated',
          align: 'center',
          value: 'updatedAt',
          sortable: false,
        },
        {
          text: 'Note',
          align: 'center',
          width: '50px',
          sortable: false,
        },
      ],
    };
  },
};
</script>
