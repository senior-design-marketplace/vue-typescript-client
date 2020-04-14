<template>
  <div>
    <v-toolbar class="d-none d-md-flex d-flex justify-center">
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="view" multiple>
        <v-btn value="received">
          <v-badge
            overlap
            color="primary"
            offset-x="7.5"
            offset-y="7.5"
            :content="received.length"
            :value="received.length"
          >
            <v-icon>mdi-email-receive</v-icon>
          </v-badge>
        </v-btn>
        <v-btn value="sent">
          <v-badge
            overlap
            color="primary"
            offset-x="7.5"
            offset-y="7.5"
            :content="sent.length"
            :value="sent.length"
          >
            <v-icon>mdi-email-send</v-icon>
          </v-badge>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <br />
    <br />
    <v-sheet :style="$store.state.darkmode ? 'background-color: #121212;' : ''">
      <h1 v-if="received.length == 0 && sent.length == 0">
        <v-img contain max-height="500" :src="require('@/../public/assets/noApps.svg')" />
        You currently have no invites.
      </h1>
      <h1 v-else-if="noResults">
        <v-img contain max-height="500" :src="require('@/../public/assets/noApps.svg')" />
        No invites found that match those filters.
      </h1>
    </v-sheet>
    <br />
    <div v-show="this.received.length > 0 && view.includes('received')">
      <v-sheet>
        <h2>Received Invites</h2>
        <h2>TODO</h2>
      </v-sheet>
    </div>
    <br />
    <div v-show="this.sent.length > 0 && view.includes('sent')">
      <v-sheet>
        <h2>Sent Invites</h2>
        <h2>TODO</h2>
      </v-sheet>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      view: [],
    };
  },
  mounted() {
    if (this.received.length > 0 || this.sent.length > 0) this.view.push(this.sent.length > this.received.length ? 'sent' : 'received');
  },
  computed: {
    received() {
      return [];
    },
    sent() {
      return [];
    },
    noResults() {
      if (this.view.length === 0) return true;
      if (this.sent.length === 0 && !this.view.includes('received')) return true;
      if (this.received.length === 0 && !this.view.includes('sent')) return true;
      return false;
    },
  },
};
</script>
