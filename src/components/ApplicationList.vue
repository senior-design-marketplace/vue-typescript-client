<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="items" :items-per-page="15" class="elevation-1">
      <template slot="item" slot-scope="props">
        <tr>
          <td @click=$router.push(/project/+props.item.id)>{{props.item.name}}</td>
          <td @click=$router.push(/project/+props.item.id)>{{props.item.major}}</td>
          <td @click=$router.push(/project/+props.item.id)>{{props.item.date}}</td>
          <v-btn color='success'>Accept</v-btn>
          <v-btn color='error'>Reject</v-btn>
        </tr>
      </template>
    </v-data-table>
  <ApplicationDialog />
  </v-container>
</template>

<script>
import axios from 'axios';
import ApplicationDialog from '@/components/ApplicationDialog.vue';

export default {
  components: { ApplicationDialog },
  props: {},
  data() {
    return {
      items: [{
        name: 'Herb Zieger',
        major: 'Software Engineering',
        date: 'today',
      }],
      headers: [
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
          text: 'Applied Date',
          align: 'left',
          sortable: true,
          value: 'date',
        },
      ],
    };
  },
  // mounted() {
  //   this.updateList();
  // },
  // methods: {
  //   updateList() {
  //     const url = `https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/staging/projects?sort_by=${
  //       this.sortby}`;
  //     axios
  //       .get(url)
  //       .then((response) => {
  //         // console.log(response.data);
  //         this.items = response.data;
  //       })
  //       .catch((error) => {
  //         // console.log(error);
  //       });
  //   },
  // },
};
</script>

  <ApplicationDialog>'@/components/';
