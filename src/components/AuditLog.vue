<template>
  <v-card>
    <v-container>
      <v-data-iterator :items="history">
        <template v-slot:default="props">
          <v-row>
            <v-col cols="12" sm="4" class="headline">
              Type & Time
            </v-col>
            <v-col cols="12" sm="4" class="headline">
              Before
            </v-col>
            <v-col cols="12" sm="4" class="headline">
              After
            </v-col>
          </v-row>
          <v-row v-for="item in props.items" :key="item.id">
            <v-col cols="12" sm="4">
              {{ item.type }}
              <br />
              {{ calendarTime(item.createdAt) }}
              <br />
              by {{item.initiateId}}
            </v-col>
            <v-col cols="12" sm="4">
              {{ difference(item.after, item.before) }}
            </v-col>
            <v-col cols="12" sm="4">
              {{ difference(item.before, item.after) }}
            </v-col>
            <v-divider inset/>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </v-card>
</template>

<script>
import { diff } from 'deep-object-diff';
import moment from 'moment';

export default {
  props: {
    history: Array,
  },
  methods: {
    displayType() {

    },
    difference(lhs, rhs) {
      return diff(lhs, rhs);
    },
    calendarTime(dateInput) {
      return moment(dateInput).calendar();
    },
  },
};
</script>
