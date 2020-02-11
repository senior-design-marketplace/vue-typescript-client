<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="people"
      :expanded="expanded"
      item-key="name"
      class="elevation-1"
      @click:row="clicked"
    >
    <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length"> {{items}} </td>
    </template>
    <template slot="group" slot-scope="props">
      <tr class="font-weight-bold">{{props.group}} {{props.items}}</tr>
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
          value: 'name',
        },
        { text: 'Project', value: 'project' },
      ],
      people: [
        {
          name: 'Herb',
          project: 'Project1',
        },
        {
          name: 'Jason',
          project: 'Project1',
        },
        {
          name: 'Ruthy',
          project: 'Project2',
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
  },
};
</script>
