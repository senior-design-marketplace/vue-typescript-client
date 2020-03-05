<template>
  <v-container>
    <h2>My Applications</h2>
    <v-data-table
      :headers="headers"
      :items="applications"
      item-key="id"
      :items-per-page="5"
      class="elevation-1"
      group-by="projectId"
      hide-default-footer
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="item in items"
            :key="item.id"
            @mouseover="selectItem(item)"
            @mouseleave="unSelectItem()"
            @click=$router.push(/project/+item.projectId)
            style="cursor: pointer;"
          >
            <td>
              <v-avatar size="36" color="primary">
                <v-img v-if="item.thumbnailLink !== undefined" :src="item.thumbnailLink" />
                <v-icon v-else dark>mdi-account-circle</v-icon>
              </v-avatar>
            </td>
            <td>{{ item.projectId }}</td>
            <td>{{ item.status }}</td>
            <td>{{ new Date(item.createdAt) }}</td>
            <td>{{ new Date(item.updatedAt) }}</td>
            <td>
              <v-btn icon>
                <v-icon> mdi-chevron-down </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
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
      selected: [],
      selectedItem: false,
      expanded: [],
      headers: [
        { text: ' ', align: 'center' },
        { text: 'Project', align: 'center', value: 'name' },
        { text: 'Status', align: 'center', value: 'status' },
        { text: 'Created', align: 'center', value: 'createdAt' },
        { text: 'Last Updated', align: 'center', value: 'updatedAt' },
        {
          align: 'center',
          width: '50px',
        },
      ],
    };
  },
  methods: {
    clicked(value) {
      const index = this.expanded.indexOf(value);
      if (index > -1) {
        this.expanded.splice(index, 1);
      } else {
        this.expanded.push(value);
      }
    },
    selectItem(item) {
      this.selectedItem = item;
    },
    unSelectItem(item) {
      this.selectedItem = false;
    },
  },
};
</script>
