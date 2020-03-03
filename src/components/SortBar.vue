<template>
  <div>
    <v-toolbar class="d-none d-md-flex">
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">{{ sort }}</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in sortList" :key="index" @click="sort = item">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn @click="toggleOrder" class="mx-1">
        <v-icon>{{ order == "descending" ? "mdi-sort-descending" : "mdi-sort-ascending" }}</v-icon>
      </v-btn>
      <v-autocomplete
        v-model="major"
        :items="availableMajors"
        label="Major"
        autocomplete="off"
        outlined
        clearable
        dense
        class="mx-1"
        flat
        hide-details
      />
      <v-autocomplete
        v-model="tag"
        :items="availableTags"
        label="Tag"
        autocomplete="off"
        outlined
        clearable
        dense
        class="mx-1"
        flat
        hide-details
      />
      <v-autocomplete
        v-model="advisor"
        :items="availableAdvisors"
        label="Advisor"
        autocomplete="off"
        outlined
        clearable
        dense
        class="mx-1"
        flat
        hide-details
      />
      <v-checkbox
        v-model="acceptingApps"
        label="Accepting Applications"
        color="primary"
        class="mx-1"
        hide-details
      />
      <v-checkbox
        v-model="hasAdvisor"
        label="Has Advisor"
        color="primary"
        class="mx-1"
        hide-details
      />
      <v-btn text tile @click="resetAll()">
        <v-icon>mdi-refresh</v-icon>
        Reset
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="view" mandatory>
        <v-btn default>
          <v-icon>mdi-view-grid</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>

    <v-card>
      <v-container class="d-block d-md-none">
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">{{ sort }}</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in sortList" :key="index" @click="sort = item">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn @click="toggleOrder" class="mx-1">
          <v-icon>{{
            order == "descending" ? "mdi-sort-descending" : "mdi-sort-ascending"
          }}</v-icon>
        </v-btn>
        <v-divider class="mx-10" vertical></v-divider>
        <v-btn text tile @click="resetAll()">
          <v-icon>mdi-refresh</v-icon>
          Reset
        </v-btn>
        <v-autocomplete
          v-model="major"
          :items="availableMajors"
          label="Major"
          autocomplete="off"
          outlined
          clearable
          dense
          class="my-1"
          flat
          hide-details
        />
        <v-autocomplete
          v-model="tag"
          :items="availableTags"
          label="Tag"
          autocomplete="off"
          outlined
          clearable
          dense
          class="my-1"
          flat
          hide-details
        />
        <v-autocomplete
          v-model="advisor"
          :items="availableAdvisors"
          label="Advisor"
          autocomplete="off"
          outlined
          clearable
          dense
          class="my-1"
          flat
          hide-details
        />
        <v-checkbox
          v-model="acceptingApps"
          label="Accepting Applications"
          color="primary"
          class="mx-1"
          hide-details
        />
        <v-checkbox
          v-model="hasAdvisor"
          label="Has Advisor"
          color="primary"
          class="mx-1"
          hide-details
        />
      </v-container>
    </v-card>
  </div>
</template>

<script>
import store from '@/store';

export default {
  data() {
    return {
      sortList: ['new', 'popular'],
      availableAdvisors: [
        'b086c492-434e-419b-80f8-1a8b1539a976',
        'ac94034b-9c03-4342-aff9-d87ea1666948',
      ],
      availableMajors: [
        'Software Engineering',
        'Computer Science',
        'Computer Engineering',
        'Mechanical Engineering',
        'Engineering Management',
        'Electrical Engineering',
        'Business and Technology',
        'Civil Engineering',
        'Environmental Engineering',
        'Chemical Engineering',
        'Biomedical Engineering',
        'Music & Technology',
        'Physics',
        'Naval Engineering',
        'Pure and Applied Mathematics',
        'Engineering Physics',
        'Cybersecurity',
        'Chemistry',
        'Biology',
        'Chemical Biology',
        'Computational Science',
        'Industrial and Systems Engineering',
        'Accounting & Analytics',
        'Finance',
        'Quantitative Finance',
        'Marketing Innovation & Analytics',
        'Information Systems',
        'Economics',
        'Management',
        'History',
        'Philosophy',
        'Social Sciences',
        'Literature',
        'Science Communication',
        'Visual Arts & Technology',
        'Science, Technology, and Society',
      ],
      availableTags: [
        'Programming',
        'Artificial Intelligence',
        'Machine Learning',
        'Deep Learning',
        'Data Mining',
        'Virtual Reality',
        'Augmented Reality',
        'Automotive',
        'Robotics',
        'Mechatronics /Automation',
        'Thermal / fluids',
        'Aviation / Aerospace Systems',
        'Biomedical',
        'Product Development',
        'Energy / Sustainability',
        'Competition',
        'Thermal / Fluids / Energy Sustainability',
        'Site / Civil Design',
        'Structural',
        'Transportation',
      ],
    };
  },
  methods: {
    toggleOrder() {
      if (this.order === 'descending') {
        store.commit('setOrder', 'ascending');
      } else if (this.order === 'ascending') {
        store.commit('setOrder', 'descending');
      }
    },
    resetAll() {
      store.commit('resetSorts');
    },
  },
  computed: {
    sort: {
      get() {
        return this.$store.state.sort;
      },
      set(newSort) {
        store.commit('setSort', newSort);
      },
    },
    order: {
      get() {
        return this.$store.state.order;
      },
      set(newOrder) {
        store.commit('setOrder', newOrder);
      },
    },
    view: {
      get() {
        return this.$store.state.view;
      },
      set(newView) {
        store.commit('setView', newView);
      },
    },
    major: {
      get() {
        return this.$store.state.major;
      },
      set(newMajor) {
        store.commit('setMajor', newMajor);
      },
    },
    tag: {
      get() {
        return this.$store.state.tag;
      },
      set(newTag) {
        store.commit('setTag', newTag);
      },
    },
    advisor: {
      get() {
        return this.$store.state.advisor;
      },
      set(newAdvisor) {
        store.commit('setAdvisor', newAdvisor);
      },
    },
    acceptingApps: {
      get() {
        return this.$store.state.acceptingApps;
      },
      set(newAcceptingApps) {
        store.commit('setAcceptingApps', newAcceptingApps);
      },
    },
    hasAdvisor: {
      get() {
        return this.$store.state.hasAdvisor;
      },
      set(newHasAdvisor) {
        store.commit('setHasAdvisor', newHasAdvisor);
      },
    },
  },
};
</script>
