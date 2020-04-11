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
                <v-hover v-slot:default="{ hover }" v-for="item in props.items" :key="item.id">
                  <v-row
                    align="center"
                    :class="
                      hover ? ($store.state.darkmode ? 'grey darken-3' : 'grey lighten-3') : ''
                    "
                  >
                    <AccountCard
                      v-show="hover"
                      :userDetails="item"
                      :isAdmin="isAdmin(item.id)"
                      :isAdvisor="isAdvisor(item.id)"
                      style="
                        position: absolute;
                        z-index: 2;
                        right: -350px;
                        width: 100%;
                      "
                    />
                    <v-col
                      cols="4"
                      sm="2"
                      md="1"
                      @click="$router.push(`/profile/${item.id}`)"
                      style="cursor: pointer;"
                    >
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
                                <v-img
                                  v-if="item.thumbnailLink !== null"
                                  :src="item.thumbnailLink"
                                />
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
                    <v-col @click="$router.push(`/profile/${item.id}`)" style="cursor: pointer;">
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
                    <v-col
                      v-if="item.id === $store.state.userDetails.cognitoUsername"
                      class="text-right"
                    >
                      <v-tooltip v-if="cantLeave(item.id)" top max-width="175">
                        <template v-slot:activator="{ on }">
                          <v-icon v-on="on" color="grey lighten-1">mdi-account-remove</v-icon>
                        </template>
                        <span
                          >Can't leave project. There needs to be at least one admin on a
                          project.</span
                        >
                      </v-tooltip>
                      <v-btn v-else icon @click="leaveDialog = true">
                        <v-icon>mdi-account-remove</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-hover>
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
      <BigDecision
        v-model="leaveDialog"
        title="Leave Project"
        :body="
          `Are you sure you want to leave ${title}? ${
            members.length === 1 ? 'This will also delete the project.' : ''
          }`
        "
        :stringToType="title"
        @confirm="leaveProject"
      />
    </v-card>
  </v-hover>
</template>

<script>
import AccountCard from '@/components/AccountCard.vue';
import BigDecision from '@/components/BigDecision.vue';
import apiCall from '@/apiCall';

export default {
  components: {
    AccountCard,
    BigDecision,
  },
  props: {
    title: String,
    contributors: Array,
    administrators: Array,
  },
  data() {
    return {
      leaveDialog: false,
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
    cantLeave(userId) {
      if (this.members.length === 1) return false;
      return this.isAdmin(userId) && this.administrators.length === 1;
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    async leaveProject() {
      this.editAcceptingApps = true;
      const response = await apiCall.methods.delete(
        `/projects/${this.$route.params.id}/members/${this.$store.state.userDetails.cognitoUsername}`,
        '',
        {},
        this.$route.fullPath,
      );
      if (response.status === 200) {
        if (this.members.length === 1) this.$router.push('/');
        this.leaveDialog = false;
        this.$emit('update');
      }
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
