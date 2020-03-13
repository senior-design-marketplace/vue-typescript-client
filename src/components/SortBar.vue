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
      <v-text-field
        v-model="advisor"
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
        <v-text-field
          v-model="advisor"
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
export default {
  data() {
    return {
      sortList: ['new', 'popular'],
      advisorTimeout: undefined,
    };
  },
  methods: {
    toggleOrder() {
      if (this.order === 'descending') {
        this.order = 'ascending';
      } else if (this.order === 'ascending') {
        this.order = 'descending';
      }
    },
    resetAll() {
      this.$store.commit('resetFilters');
    },
  },
  computed: {
    availableMajors() {
      return this.$store.state.majors;
    },
    availableTags() {
      return this.$store.state.tags;
    },
    sort: {
      get() {
        return this.$store.state.filters.sort;
      },
      set(newSort) {
        this.$store.commit('updateFilter', { filter: 'sort', value: newSort });
      },
    },
    order: {
      get() {
        return this.$store.state.filters.order;
      },
      set(newOrder) {
        this.$store.commit('updateFilter', { filter: 'order', value: newOrder });
      },
    },
    view: {
      get() {
        return this.$store.state.filters.view;
      },
      set(newView) {
        this.$store.commit('updateFilter', { filter: 'view', value: newView });
      },
    },
    major: {
      get() {
        return this.$store.state.filters.major;
      },
      set(newMajor) {
        this.$store.commit('updateFilter', { filter: 'major', value: newMajor });
      },
    },
    tag: {
      get() {
        return this.$store.state.filters.tag;
      },
      set(newTag) {
        this.$store.commit('updateFilter', { filter: 'tag', value: newTag });
      },
    },
    advisor: {
      get() {
        return this.$store.state.filters.advisor;
      },
      set(newAdvisor) {
        clearTimeout(this.advisorTimeout);
        this.advisorTimeout = setTimeout(() => {
          this.$store.commit('updateFilter', { filter: 'advisor', value: newAdvisor });
        }, 500);
      },
    },
    acceptingApps: {
      get() {
        return this.$store.state.filters.acceptingApps;
      },
      set(newAcceptingApps) {
        this.$store.commit('updateFilter', { filter: 'acceptingApps', value: newAcceptingApps });
      },
    },
    hasAdvisor: {
      get() {
        return this.$store.state.filters.hasAdvisor;
      },
      set(newHasAdvisor) {
        this.$store.commit('updateFilter', { filter: 'hasAdvisor', value: newHasAdvisor });
      },
    },
  },
};
</script>
