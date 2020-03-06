<template>
  <v-card>
    <v-container>
      <h2>Advisors:</h2>
      <v-container>
        <v-row v-for="advisor in advisors" :key="advisor.id" align="center" class="spacer">
          <v-col cols="4" sm="2" md="1">
            <v-tooltip v-if="isAdmin(advisor.id)" top max-width="175">
              <template v-slot:activator="{ on }">
                <v-badge color="yellow darken-2" icon="mdi-crown" overlap>
                  <v-avatar size="36" color="primary" v-on="on">
                    <v-img v-if="advisor.thumbnailLink !== null" :src="advisor.thumbnailLink" />
                    <v-icon v-else dark>mdi-account-circle</v-icon>
                  </v-avatar>
                </v-badge>
              </template>
              <span>{{ advisor.id }} is an administrator of {{ title }}.</span>
            </v-tooltip>
            <v-avatar v-else size="36" color="primary">
              <v-img v-if="advisor.thumbnailLink !== null" :src="advisor.thumbnailLink" />
              <v-icon v-else dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
          <v-col>
            <span>{{ advisor.id }} </span>
          </v-col>
        </v-row>
      </v-container>
      <h2>Members:</h2>
      <v-container>
        <v-row v-for="member in members" :key="member.id" align="center" class="spacer">
          <v-col cols="4" sm="2" md="1">
            <v-tooltip v-if="isAdmin(member.id)" top max-width="175">
              <template v-slot:activator="{ on }">
                <v-badge color="yellow darken-2" icon="mdi-crown" overlap>
                  <v-avatar size="36" color="primary" v-on="on">
                    <v-img v-if="member.thumbnailLink !== null" :src="member.thumbnailLink" />
                    <v-icon v-else dark>mdi-account-circle</v-icon>
                  </v-avatar>
                </v-badge>
              </template>
              <span>{{ member.id }} is an administrator of {{ title }}.</span>
            </v-tooltip>
            <v-avatar v-else size="36" color="primary">
              <v-img v-if="member.thumbnailLink !== null" :src="member.thumbnailLink" />
              <v-icon v-else dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
          <v-col>
            <span>{{ member.id }} </span>
          </v-col>
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
      return this.administrators.map(admin => admin.id).includes(personId);
    },
  },
};
</script>
