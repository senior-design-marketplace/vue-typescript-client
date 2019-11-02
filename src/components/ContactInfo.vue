<template>
  <v-card>
    <v-container>
      <h2>Advisors:</h2>
      <v-container>
        <v-row v-for="advisor in advisors" :key="advisor" align="center" class="spacer">
          <v-col cols="4" sm="2" md="1">
            <v-avatar color="black">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
          <v-col>
            <v-text>{{advisor}}</v-text>
          </v-col>
        </v-row>
      </v-container>
      <h2>Members:</h2>
      <v-container>
        <v-row v-for="member in members" :key="member" align="center" class="spacer">
          <v-col cols="4" sm="2" md="1">
            <v-avatar color="black">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
          <v-col>
            <v-text>{{member}}</v-text>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    members: Array,
    advisors: Array
  }
};
</script>