<template>
  <v-container>
    <h2>Grouping Table with expand/collapse all</h2>

    <v-btn color="primary" small @click="collapseAll">Collapse All</v-btn>
    <v-btn color="secondary" small @click="expandAll">Expand All</v-btn>

    <v-data-table
      ref="expandableTable"
      :headers="headers"
      :items="desserts"
      hide-actions
      item-key="name"
      group-by="category"
      hide-default-header
    >

      <template slot="item" slot-scope="props">
        <tr>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.calories }}</td>
          <td>{{ props.item.fat }}</td>
          <td>{{ props.item.carbs }}</td>
          <td>{{ props.item.protein }}</td>
          <td>{{ props.item.iron }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  methods: {
    collapseAll() {
      this.$refs.expandableTable.collapseAll();
    },
    expandAll() {
      this.$refs.expandableTable.expandAll();
    },
  },
  data: () => ({
    headers: [
      { text: 'Dessert (100g serving)', value: 'name' },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' },
    ],
    desserts: [
      {
        value: false,
        name: 'Orange Juice',
        category: 'Beverage',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
      },
      {
        value: false,
        name: 'Larabar',
        category: 'Snack',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%',
      },
      {
        value: false,
        name: 'Donut',
        category: 'Breakfast',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%',
      },

      {
        value: false,
        name: 'Bagel',
        category: 'Breakfast',
        calories: 999,
        fat: 28.0,
        carbs: 151,
        protein: 2.9,
        iron: '29%',
      },
      {
        value: false,
        name: 'KitKat',
        category: 'Snack',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
    ],
    groupSortDescending: false,
  }),
};


</script>
