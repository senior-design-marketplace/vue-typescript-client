<template>
  <v-card>
    <v-container>
      <h2>Members:</h2>
      <v-container>
        <v-row v-for="member in members" :key="member.id" align="center" class="spacer">
          <v-col cols="4" sm="2" md="1">
            <v-tooltip v-if="isAdmin(member.id) && isAdvisor(member.id)" top max-width="175">
              <template v-slot:activator="{ on }">
                <v-badge
                  color="yellow darken-2"
                  icon="mdi-crown"
                  overlap
                  offset-x="18"
                  offset-y="7"
                >
                  <v-badge
                    color="purple darken-2"
                    icon="mdi-school"
                    overlap
                    offset-x="7"
                    offset-y="18"
                  >
                    <v-avatar
                      size="36"
                      :color="member.thumbnailLink !== null ? undefined : 'primary'"
                      v-on="on"
                    >
                      <v-img v-if="member.thumbnailLink !== null" :src="member.thumbnailLink" />
                      <v-icon v-else dark>mdi-account-circle</v-icon>
                    </v-avatar>
                  </v-badge>
                </v-badge>
              </template>
              <span>Administrator and advisor of this project.</span>
            </v-tooltip>
            <v-tooltip v-else-if="isAdmin(member.id)" top max-width="175">
              <template v-slot:activator="{ on }">
                <v-badge color="yellow darken-2" icon="mdi-crown" overlap>
                  <v-avatar
                    size="36"
                    :color="member.thumbnailLink !== null ? undefined : 'primary'"
                    v-on="on"
                  >
                    <v-img v-if="member.thumbnailLink !== null" :src="member.thumbnailLink" />
                    <v-icon v-else dark>mdi-account-circle</v-icon>
                  </v-avatar>
                </v-badge>
              </template>
              <span>Administrator of this project.</span>
            </v-tooltip>
            <v-tooltip v-else-if="isAdvisor(member.id)" top max-width="175">
              <template v-slot:activator="{ on }">
                <v-badge color="purple darken-2" icon="mdi-school" overlap>
                  <v-avatar
                    size="36"
                    :color="member.thumbnailLink !== null ? undefined : 'primary'"
                    v-on="on"
                  >
                    <v-img v-if="member.thumbnailLink !== null" :src="member.thumbnailLink" />
                    <v-icon v-else dark>mdi-account-circle</v-icon>
                  </v-avatar>
                </v-badge>
              </template>
              <span>Advisor of this project.</span>
            </v-tooltip>
            <v-avatar
              v-else
              size="36"
              :color="member.thumbnailLink !== null ? undefined : 'primary'"
            >
              <v-img v-if="member.thumbnailLink !== null" :src="member.thumbnailLink" />
              <v-icon v-else dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
          <v-col>
            <span>{{ member.firstName }} {{ member.lastName }} </span>
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
  },
  methods: {
    isAdmin(personId) {
      if (this.members === undefined) return [];
      return this.members
        .filter(member => member.role === 'ADMINISTRATOR')
        .map(admin => admin.id)
        .includes(personId);
    },
    isContributor(personId) {
      if (this.members === undefined) return [];
      return this.members
        .filter(member => member.role === 'CONTRIBUTOR')
        .map(admin => admin.id)
        .includes(personId);
    },
    isAdvisor(personId) {
      if (this.members === undefined) return [];
      return this.members
        .filter(member => member.isAdvisor)
        .map(admin => admin.id)
        .includes(personId);
    },
  },
};
</script>
