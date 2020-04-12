<template>
  <v-row no-gutters>
    <v-col class="secondary" :style="`max-width: 250px; min-height:${windowHeight}px`">
      <v-toolbar flat dark class="secondary d-none d-md-flex d-flex justify-center">
        <v-toolbar-title>
          <h3>Dashboard</h3>
        </v-toolbar-title>
      </v-toolbar>
      <v-list dark class="secondary">
        <v-list-item-group v-model="view" mandatory>
          <v-list-item value="myprojects">
            <v-list-item-title>
              My Projects
            </v-list-item-title>
          </v-list-item>
          <v-list-item value="applications">
            <v-list-item-title>
              Applications
            </v-list-item-title>
          </v-list-item>
          <v-list-item value="invites">
            <v-list-item-title>
              Invites
            </v-list-item-title>
          </v-list-item>
          <v-list-item value="inbox">
            <v-list-item-title>
              Inbox
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
    <v-col>
      <MyProjects v-show="view === 'myprojects'" />
      <Applications v-show="view === 'applications'" />
      <Invites v-show="view === 'invites'" />
      <Inbox v-show="view === 'inbox'" />
    </v-col>
  </v-row>
</template>

<script>
import MyProjects from '@/views/MyProjects.vue';
import Applications from '@/views/Applications.vue';
import Invites from '@/views/Invites.vue';
import Inbox from '@/views/Inbox.vue';

export default {
  components: {
    MyProjects,
    Applications,
    Invites,
    Inbox,
  },
  data() {
    return {
      view: 'myprojects',
    };
  },
  watch: {
    urlParams() {
      this.view = this.urlParams;
    },
  },
  mounted() {
    this.view = this.urlParams;
  },
  computed: {
    windowHeight() {
      return document.documentElement.scrollHeight;
    },
    urlParams() {
      return this.$route.params.view;
    },
  },
};
</script>
