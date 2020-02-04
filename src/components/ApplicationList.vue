<template>
<v-container>
  <v-data-table
    :headers="headers"
    :items="projects"
    :expanded="expanded"
    item-key="name"
    show-expand
    class="elevation-1"
    @click:row="clicked"
  >
    <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length">
      <v-data-table
  :headers="peopleHeaders"
  :items="people"
  item-key='name'
  hide-default-footer
  class='elevation-1'>
  <template slot="item" slot-scope="props">
        <tr>
          <td>{{props.item.name}}</td>
          <td>{{props.item.major}}</td>
          <td>{{props.item.preference}}</td>
          <td>
          <v-btn color='success'>Accept</v-btn>
          <v-btn color='error'>Reject</v-btn>
          </td>
        </tr>
      </template>
  </v-data-table>
  </td>
    </template>
  </v-data-table>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      expanded: [],
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        { text: 'Status', value: 'Status' },
      ],
      projects: [
        {
          name: '#this is the project they applied to',
          Status: 'Status: Pending',
        },
      ],
      peopleHeaders: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Major',
          align: 'left',
          sortable: true,
          value: 'major',
        },
        {
          text: 'Preference',
          align: 'left',
          sortable: true,
          value: 'preference',
        },
      ],
      people: [
        {
          name: 'BORB',
          major: 'SWE',
          preference: 'idk',
        },
      ],
    };
  },
  methods: {
    clicked(value) {
      this.expanded.push(value);
    },
  },
};
</script>
