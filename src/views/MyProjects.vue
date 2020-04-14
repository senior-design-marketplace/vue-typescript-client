<template>
  <div>
    <v-toolbar class="d-none d-md-flex d-flex justify-center">
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="view" multiple>
        <v-btn value="admin">
          <v-badge
            overlap
            color="primary"
            offset-x="7.5"
            offset-y="7.5"
            :content="adminProjects.length"
            :value="adminProjects.length"
          >
            <v-icon>mdi-crown</v-icon>
          </v-badge>
        </v-btn>
        <v-btn value="contrib">
          <v-badge
            overlap
            color="primary"
            offset-x="7.5"
            offset-y="7.5"
            :content="contribProjects.length"
            :value="contribProjects.length"
          >
            <v-icon>mdi-account</v-icon>
          </v-badge>
        </v-btn>
        <v-btn value="starred">
          <v-badge
            overlap
            color="primary"
            offset-x="7.5"
            offset-y="7.5"
            :content="starredProjects.length"
            :value="starredProjects.length"
          >
            <v-icon>mdi-star</v-icon>
          </v-badge>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <br />
    <v-sheet
      v-if="
        adminProjects.length === 0 && contribProjects.length === 0 && starredProjects.length === 0
      "
      :style="$store.state.darkmode ? 'background-color: #121212;' : ''"
    >
      <h1>
        <v-img contain max-height="500" :src="require('@/../public/assets/noProjects.svg')" />
        You have not starred or joined any projects!
      </h1>
    </v-sheet>
    <CardDeck v-else-if="displayProjects.length > 0" :items="displayProjects" />
    <v-sheet
      v-else-if="displayProjects.length === 0"
      :style="$store.state.darkmode ? 'background-color: #121212;' : ''"
    >
      <h1>
        <v-img contain max-height="500" :src="require('@/../public/assets/noResults.svg')" />
        No projects found that match those filters.
      </h1>
    </v-sheet>
  </div>
</template>

<script>
import CardDeck from '@/components/CardDeck.vue';

export default {
  data() {
    return {
      view: [],
    };
  },
  components: {
    CardDeck,
  },
  mounted() {
    if (
      this.adminProjects.length > 0
      || this.contribProjects.length > 0
      || this.starredProjects.length > 0
    ) {
      if (this.adminProjects.length + this.contribProjects.length < this.starredProjects.length) this.view.push('starred');
      else {
        if (this.adminProjects.length > 0) this.view.push('admin');
        if (this.contribProjects.length > 0) this.view.push('contrib');
      }
    }
  },
  computed: {
    displayProjects() {
      let display = [];
      if (this.view.includes('admin')) {
        const uniqueAdmin = this.adminProjects.filter(b => !display.map(a => a.id).includes(b.id));
        display = display.concat(uniqueAdmin);
      }
      if (this.view.includes('contrib')) {
        const uniqueContrib = this.contribProjects.filter(
          b => !display.map(a => a.id).includes(b.id),
        );
        display = display.concat(uniqueContrib);
      }
      if (this.view.includes('starred')) {
        const uniqueStarred = this.starredProjects.filter(
          b => !display.map(a => a.id).includes(b.id),
        );
        display = display.concat(uniqueStarred);
      }
      return display;
    },
    adminProjects() {
      if (this.$store.state.userDetails.administratorOn === undefined) return [];
      return this.$store.state.userDetails.administratorOn;
    },
    contribProjects() {
      if (this.$store.state.userDetails.contributorOn === undefined) return [];
      return this.$store.state.userDetails.contributorOn;
    },
    starredProjects() {
      if (this.$store.state.userDetails.starred === undefined) return [];
      return this.$store.state.userDetails.starred;
    },
  },
};
</script>
