<template>
  <v-container>
    <h2>Applications for Approval</h2>
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
          >
            <td>
              <v-avatar size="36" color="primary">
                <v-img v-if="item.thumbnailLink !== undefined" :src="item.thumbnailLink" />
                <v-icon v-else dark>mdi-account-circle</v-icon>
              </v-avatar>
            </td>
            <td>{{ item.userId }}</td>
            <td>{{ item.major }}</td>
            <td>{{ item.status }}</td>
            <td>{{ new Date(item.createdAt) }}</td>
            <td>{{ new Date(item.updatedAt) }}</td>
            <td>
              <div v-if="item === selectedItem">
                <v-btn @click="replyApplication('ACCEPTED')" color="success">Accept</v-btn>
                <v-btn @click="replyApplication('REJECTED')" color="error">Reject</v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import apiCall from '@/apiCall';

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
        { text: ' ', align: 'center', value: 'thumbnailLink' },
        { text: 'Name', align: 'center', value: 'name' },
        { text: 'Major', align: 'center', value: 'major' },
        { text: 'Status', align: 'center', value: 'status' },
        { text: 'Created', align: 'center', value: 'createdAt' },
        { text: 'Last Updated', align: 'center', value: 'updatedAt' },
        {
          text: 'Actions',
          align: 'center',
          value: 'actions',
          width: '250px',
        },
      ],
    };
  },
  methods: {
    async replyApplication(decision) {
      const response = await apiCall.methods.patch(
        `/projects/${this.selectedItem.projectId}/applications/${this.selectedItem.id}`,
        '',
        { response: decision },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.selectedItem.status = decision;
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
