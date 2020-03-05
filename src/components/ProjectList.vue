<template>
  <v-container fluid>
    <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="15"
    class="elevation-1"
    no-data-text="No projects found that match those filters"
      loading-text="Loading projects..."
      :loading="loading">
      <template slot="item" slot-scope="props">
        <tr @click=$router.push(/project/+props.item.id)>
          <td>{{props.item.title}}</td>
          <td>{{props.item.tagline}}</td>
          <td><v-chip-group column>
            <v-chip label v-for="tag in props.item.tags" :key="tag" class="noClick">{{tag}}</v-chip>
          </v-chip-group></td>
          <td>
            <v-item v-if="props.item.acceptingApplications == true">
              <v-tooltip top max-width="175">
                <template v-slot:activator="{ on }">
                  <span icon v-on="on">
                    <v-icon color="success">mdi-sticker-check-outline</v-icon>
                  </span>
                </template>
                <span>{{ props.item.title }} is accepting applications.</span>
              </v-tooltip>
            </v-item>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import apiCall from '@/apiCall';

export default {
  data() {
    return {
      headers: [
        {
          text: 'Title',
          align: 'center',
          sortable: false,
          value: 'title',
        },
        {
          text: 'Tagline',
          align: 'center',
          sortable: false,
          value: 'tagline',
        },
        {
          text: 'Tags',
          align: 'center',
          sortable: false,
          value: 'tags',
        },
        {
          text: 'Accepting Applications',
          align: 'center',
          sortable: false,
          value: 'acceptionApps',
        },
      ],
    };
  },
  props: {
    items: Array,
    loading: Boolean,
  },
};
</script>
