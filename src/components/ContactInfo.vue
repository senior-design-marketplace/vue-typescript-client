<template>
  <v-hover v-model="hovered">
    <v-card height="511">
      <v-container>
        <v-container style="height: 450px;">
          <v-data-iterator
            :items="members"
            :items-per-page="itemsPerPage"
            :page.sync="page"
            hide-default-footer
          >
            <template v-slot:default="props">
              <v-slide-x-transition group hide-on-leave>
                <v-row v-for="item in props.items" :key="item.id" align="center" class="spacer">
                  <v-col cols="4" sm="2" md="1">
                    <v-tooltip v-if="isAdmin(item.id) && isAdvisor(item.id)" top max-width="175">
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
                              :color="item.thumbnailLink !== null ? undefined : 'primary'"
                              v-on="on"
                            >
                              <v-img v-if="item.thumbnailLink !== null" :src="item.thumbnailLink" />
                              <v-icon v-else dark>mdi-account-circle</v-icon>
                            </v-avatar>
                          </v-badge>
                        </v-badge>
                      </template>
                      <span>Administrator and advisor of this project.</span>
                    </v-tooltip>
                    <v-tooltip v-else-if="isAdmin(item.id)" top max-width="175">
                      <template v-slot:activator="{ on }">
                        <v-badge color="yellow darken-2" icon="mdi-crown" overlap>
                          <v-avatar
                            size="36"
                            :color="item.thumbnailLink !== null ? undefined : 'primary'"
                            v-on="on"
                          >
                            <v-img v-if="item.thumbnailLink !== null" :src="item.thumbnailLink" />
                            <v-icon v-else dark>mdi-account-circle</v-icon>
                          </v-avatar>
                        </v-badge>
                      </template>
                      <span>Administrator of this project.</span>
                    </v-tooltip>
                    <v-tooltip v-else-if="isAdvisor(item.id)" top max-width="175">
                      <template v-slot:activator="{ on }">
                        <v-badge color="purple darken-2" icon="mdi-school" overlap>
                          <v-avatar
                            size="36"
                            :color="item.thumbnailLink !== null ? undefined : 'primary'"
                            v-on="on"
                          >
                            <v-img v-if="item.thumbnailLink !== null" :src="item.thumbnailLink" />
                            <v-icon v-else dark>mdi-account-circle</v-icon>
                          </v-avatar>
                        </v-badge>
                      </template>
                      <span>Advisor of this project.</span>
                    </v-tooltip>
                    <v-avatar
                      v-else
                      size="36"
                      :color="item.thumbnailLink !== null ? undefined : 'primary'"
                    >
                      <v-img v-if="item.thumbnailLink !== null" :src="item.thumbnailLink" />
                      <v-icon v-else dark>mdi-account-circle</v-icon>
                    </v-avatar>
                  </v-col>
                  <v-col>
                    <v-list-item-title class="ml-7 text-left" style="max-width: 266px;">
                      {{ item.firstName }} {{ item.lastName }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                      class="ml-7 text-left grey--text"
                      style="max-width: 266px;"
                    >
                      {{ item.email }}
                    </v-list-item-subtitle>
                  </v-col>
                </v-row>
              </v-slide-x-transition>
            </template>
          </v-data-iterator>
        </v-container>
        <v-row v-if="numberOfPages !== 1" class="mx-2" align="center" justify="center">
          <v-btn
            icon
            dark
            color="secondary"
            class="mx-1"
            @click="formerPage()"
            :disabled="page === 1"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <span class="mx-1 secondary--text"> Page {{ page }}/{{ numberOfPages }} </span>
          <v-btn
            icon
            dark
            color="secondary"
            class="mx-1"
            @click="nextPage()"
            :disabled="page === numberOfPages"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    contributors: Array,
    administrators: Array,
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 6,
      hovered: true,
    };
  },
  methods: {
    isContributor(personId) {
      if (this.members === undefined) return [];
      return this.contributors.map(admin => admin.id).includes(personId);
    },
    isAdmin(personId) {
      if (this.members === undefined) return [];
      return this.administrators.map(admin => admin.id).includes(personId);
    },
    isAdvisor(personId) {
      if (this.members === undefined) return [];
      return this.members
        .filter(member => member.roles.includes('faculty'))
        .map(admin => admin.id)
        .includes(personId);
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
  },
  mounted() {
    const interval = setInterval(() => {
      if (!this.hovered && this.numberOfPages > 1) {
        if (this.page + 1 <= this.numberOfPages) {
          this.page += 1;
        } else {
          this.page = 1;
        }
      }
    }, 3000);
  },
  computed: {
    members() {
      if (this.administrators === undefined || this.contributors === undefined) {
        return [];
      }
      return this.administrators.concat(this.contributors);
    },
    numberOfPages() {
      return Math.ceil(this.members.length / this.itemsPerPage);
    },
  },
};
</script>
