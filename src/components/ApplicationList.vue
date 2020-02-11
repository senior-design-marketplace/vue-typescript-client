<template>
  <v-container>
    <v-data-table
      hide-default-header
      hide-default-footer
      :headers="headers"
      :items="people"
      :expanded="expanded"
      item-key="name"
      group-by="project"
      class="elevation-1"
      @click:row="clicked"
    >
      <template slot="item" slot-scope="props">
        <td :colspan="headers.length">{{props.item.name}}</td>
      </template>
      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length">blah</td>
      </template>
      <template slot="group.header" slot-scope="props">
        <td :colspan="props.headers.length">
          <v-toolbar @click="props.toggle" class="font-weight-bold">
            {{ props.group }}
          </v-toolbar>
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
        { text: 'Name', value: 'name' },
        { text: 'Project', value: 'project' },
        { text: 'Major', value: 'major' },
      ],
      people: [
        {
          name: 'Herb',
          major: 'Software Engineering',
          project: 'Project1',
        },
        {
          name: 'Jason',
          major: 'Software Engineering',
          project: 'Project1',
        },
        {
          name: 'Ruthy',
          major: 'Software Engineering',
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
