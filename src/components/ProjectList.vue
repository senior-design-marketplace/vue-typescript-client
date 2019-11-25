<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="items" :items-per-page="15" class="elevation-1">
      <template slot="item" slot-scope="props">
        <tr @click=$router.push(/project/+props.item.id)>
          <td>{{props.item.title}}</td>
          <td>{{props.item.tagline}}</td>
          <td><v-chip-group column>
            <v-chip label v-for="tag in props.item.tags" :key="tag" class="noClick">{{tag}}</v-chip>
          </v-chip-group></td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    sortbyUpdate: String,
    orderUpdate: String,
  },
  data() {
    return {
      sortby: 'new',
      order: 'descending',
      items: [],
      headers: [
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
          text: 'Tags',
          align: 'left',
          sortable: false,
          value: 'tags',
        },
      ],
    };
  },
  mounted() {
    this.updateList();
  },
  watch: {
    sortbyUpdate() {
      this.sortby = this.sortbyUpdate;
      this.updateList();
    },
    orderUpdate() {
      this.order = this.orderUpdate;
      this.updateList();
    },
  },
  methods: {
    updateList() {
      let url = `https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/staging/projects?sort_by=${
        this.sortby}`;
      if (this.order === 'ascending') {
        url += '&order=reverse';
      }
      axios
        .get(url)
        .then((response) => {
          // console.log(response.data);
          this.items = response.data;
        })
        .catch((error) => {
          // console.log(error);
        });
    },
  },
};
</script>
