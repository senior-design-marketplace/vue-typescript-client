<template>
  <div>
    <v-btn
      v-if="isLoggedIn && $route.fullPath !== '/create'"
      to="/create"
      color="primary"
      fab
      x-large
      fixed
      bottom
      right
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-app-bar dark height="100" color="secondary">
      <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-md-none"></v-app-bar-nav-icon>
      <v-container>
        <router-link to="/">
          <v-img
            :src="require('@/../public/assets/header.jpg')"
            :aspect-ratio="6.71906355"
            max-height="60"
            max-width="403"
          />
        </router-link>
      </v-container>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-md-flex">
        <v-btn text class="item" to="/">Projects</v-btn>
        <v-btn v-if="isLoggedIn" text class="item" to="/dashboard">Dashboard</v-btn>
        <!-- <v-btn v-if="isLoggedIn" text class="item" to="/create">Create Project</v-btn> -->
        <v-btn v-if="!isLoggedIn" text class="item" to="/about">About</v-btn>
        <v-btn v-if="!isLoggedIn" @click="login" text class="item">Login</v-btn>
      </v-toolbar-items>
      <div class="d-flex">
        <v-menu v-if="isLoggedIn && unread.length > 0" open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <span v-on="on">
              <v-btn icon @click="$router.push('/dashboard/inbox')">
                <v-badge color="red" overlap :content="unread.length">
                  <v-icon>mdi-bell</v-icon>
                </v-badge>
              </v-btn>
            </span>
          </template>
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(item, index) in unread" :key="index">
                <v-list-item-content
                  v-if="
                    item.document.type === 'APPLICATION' &&
                      item.document.application.userId === $store.state.userDetails.cognitoUsername
                  "
                  @click="handleApplication(item)"
                >
                  <v-list-item-title class="text-right">
                    {{ displayType(item.document.type) }} sent to
                    {{ item.document.application.projectId }}
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content
                  v-else-if="item.document.type === 'APPLICATION'"
                  @click="handleApplication(item)"
                >
                  <v-list-item-title
                    v-if="item.document.application.status == 'PENDING'"
                    class="text-right"
                  >
                    {{ displayType(item.document.type) }}
                    from {{ item.document.application.userId }}
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-title>
                  <v-list-item-title v-else class="text-right">
                    {{ displayType(item.document.type) }}
                    from {{ item.document.application.userId }} has been
                    {{ displayType(item.document.application.status) }}
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-content
                  v-else-if="
                    item.document.type === 'INVITE' &&
                      item.document.invite.targetId === $store.state.userDetails.cognitoUsername
                  "
                  @click="handleInvite(item)"
                >
                  <v-list-item-title class="text-right">
                    {{ displayType(item.document.type) }} received from
                    {{ item.document.invite.initiateId }}
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content
                  v-else-if="item.document.type === 'INVITE'"
                  @click="handleInvite(item)"
                >
                  <v-list-item-title
                    v-if="item.document.invite.status == 'PENDING'"
                    class="text-right"
                  >
                    {{ displayType(item.document.type) }}
                    sent to {{ item.document.invite.targetId }}
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-title>
                  <v-list-item-title v-else class="text-right">
                    {{ displayType(item.document.type) }}
                    to {{ item.document.invite.targetId }} has been
                    {{ displayType(item.document.invite.status) }}
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-content v-else>
                  <v-list-item-title class="text-right">
                    {{ displayType(item.document.type) }}
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <v-tooltip v-else-if="isLoggedIn && unread.length === 0" top max-width="175">
          <template v-slot:activator="{ on }">
            <v-btn icon to="/dashboard/inbox" v-on="on">
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </template>
          <span>No new notifications!</span>
        </v-tooltip>

        <v-menu v-if="isLoggedIn" open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <span v-on="on">
              <v-btn icon to="/profile">
                <v-list-item-avatar to="/profile" icon class="mx-1" style="cursor:pointer;">
                  <v-img
                    v-if="$store.state.userDetails.thumbnailLink !== null"
                    :src="$store.state.userDetails.thumbnailLink"
                  />
                  <v-icon v-else>mdi-account-circle</v-icon>
                </v-list-item-avatar>
              </v-btn>
            </span>
          </template>
          <v-list>
            <v-list-item to="/profile">
              <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item>
            <v-list-item to="/about">
              <v-list-item-title>About</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-toolbar
        v-if="isLoggedIn"
        class="px-2"
        @click="
          $router.push('/profile').catch(err => {
            drawer = false;
          })
        "
        dark
        color="secondary"
        style="cursor: pointer;"
      >
        <v-list-item-avatar>
          <v-img
            v-if="$store.state.userDetails.thumbnailLink !== null"
            :src="$store.state.userDetails.thumbnailLink"
          />
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ name }}</v-list-item-title>
      </v-toolbar>

      <v-toolbar v-else class="px-2" dark color="secondary">
        <v-list-item-title tile>
          <v-img contain :src="require('@/../public/assets/header.png')" />
        </v-list-item-title>
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Projects</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="isLoggedIn" to="/dashboard">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-list-item link v-if="isLoggedIn" to="/create">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Create Project</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <v-list-item
          link
          v-if="isLoggedIn"
          @click="
            $router.push('/dashboard/inbox').catch(err => {
              drawer = false;
            })
          "
        >
          <v-list-item-icon>
            <v-icon>mdi-bell</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Notifications</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="isLoggedIn" to="/profile">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>My Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/about">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="!isLoggedIn" @click="login">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="isLoggedIn" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import apiCall from '@/apiCall';

export default {
  data: () => ({
    drawer: false,
  }),
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('/').catch((err) => {});
    },
    login() {
      this.$store.commit('setsavePath', this.$route.fullPath);
      window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
    },
    displayType(type) {
      switch (type) {
        case 'APPLICATION':
          return 'Application';
        case 'INVITE':
          return 'Invite';
        case 'PENDING':
          return 'pending';
        case 'ACCEPTED':
          return 'accepted';
        case 'REJECTED':
          return 'rejected';
        default:
          return type;
      }
    },
    handleApplication(notif) {
      if (notif.document.application.status === 'PENDING') {
        this.$router
          .push(`/dashboard/applications/${notif.document.application.id}`)
          .catch((err) => {});
      } else {
        this.$router.push(`/project/${notif.document.application.projectId}`).catch((err) => {});
      }
      this.markAsRead(notif.id);
    },
    handleInvite(notif) {
      if (notif.document.invite.status === 'PENDING') {
        this.$router
          .push(`/dashboard/invites/${notif.document.invite.id}`)
          .catch((err) => {});
      } else {
        this.$router.push(`/project/${notif.document.invite.projectId}`).catch((err) => {});
      }
      this.markAsRead(notif.id);
    },
    async markAsRead(id) {
      const response = await apiCall.methods.patch(
        `/users/${this.$store.state.userDetails.cognitoUsername}/notifications/${id}`,
        '',
        { read: true },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        const index = this.$store.state.notifications.map(a => a.id).indexOf(id);
        this.$store.state.notifications.splice(index, 1, response.data);
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    name() {
      return `${this.$store.state.userDetails.firstName} ${this.$store.state.userDetails.lastName}`;
    },
    notifications() {
      return this.$store.state.notifications;
    },
    unread() {
      return this.notifications.filter(a => !a.read);
    },
  },
};
</script>

<style>
.item {
  font-size: 15px !important;
  font-weight: bold !important;
}
</style>
