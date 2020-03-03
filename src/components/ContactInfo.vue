<template>
  <v-card>
    <v-container>
      <h2>Advisors:</h2>
      <v-container>
        <v-row v-for="advisor in advisors" :key="advisor.id" align="center" class="spacer">
          <v-col cols="4" sm="2" md="1">
            <v-avatar color="black">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
          <v-col>
            <span>{{ advisor.id }} </span>
          </v-col>
          <v-tooltip top max-width="175">
            <template v-slot:activator="{ on }">
              <span icon v-on="on">
                <v-icon color="yellow darken-2" v-if="isAdmin(advisor.id)">mdi-crown</v-icon>
              </span>
            </template>
            <span>{{ advisor.id }} is an administrator of {{ title }}.</span>
          </v-tooltip>
        </v-row>
      </v-container>
      <h2>Members:</h2>
      <v-container>
        <v-row v-for="member in members" :key="member.id" align="center" class="spacer">
          <v-col cols="4" sm="2" md="1">
            <v-avatar color="black">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
          <v-col>
            <span>{{ member.id }} </span>
          </v-col>
          <v-tooltip top max-width="175">
            <template v-slot:activator="{ on }">
              <span icon v-on="on">
                <v-icon color="yellow darken-2" v-if="isAdmin(member.id)">mdi-crown</v-icon>
              </span>
            </template>
            <span>{{ member.id }} is an administrator of {{ title }}.</span>
          </v-tooltip>
        </v-row>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    members: Array,
    advisors: Array,
    administrators: Array,
  },
  methods: {
    isAdmin(personId) {
      return JSON.stringify(this.administrators).indexOf(personId) > -1;
    },
  },
};
</script>
