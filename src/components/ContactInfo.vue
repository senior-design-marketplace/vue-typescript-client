<template>
  <v-card>
    <v-container>
      <v-list-item-title class="headline text-left">Advisors:</v-list-item-title>
      <v-container>
        <v-row v-for="advisor in advisors" :key="advisor" align="center" class="spacer">
          <v-col cols="4" sm="2" md="1">
            <v-avatar color="black">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
          <v-col>
            <strong v-html="advisor"></strong>
          </v-col>
        </v-row>
      </v-container>
      <v-list-item-title class="headline text-left">Members:</v-list-item-title>
      <v-container>
        <v-row v-for="member in members" :key="member" align="center" class="spacer">
          <v-col cols="4" sm="2" md="1">
            <v-avatar color="black">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
          <v-col>
            <strong v-html="member"></strong>
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