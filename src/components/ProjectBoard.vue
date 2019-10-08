<template>
  <div id="app">
    <v-app id="inspire">
      <div>
        <v-timeline :reverse="!reverse" dense>
          <v-timeline-item>
            <v-card class="elevation-2">
              <v-card-title class="headline">October 2019:</v-card-title>
              <v-card-text>
                Simple UI generation from client in response to a live call from the server.
                Initial UI mockups for web client finished and handed over to SDEs.
              </v-card-text>
            </v-card>
          </v-timeline-item>
          <v-timeline-item>
            <v-card class="elevation-2">
              <v-card-title class="headline">September 2019:</v-card-title>
              <v-card-text>Schemas validated and initial routes stubbed for future implementation. Requirements validation with EMs and generation of an ordered product backlog. Developer middlewares and other tooling written to facilitate further development. Server capable of being stood up and responding to simple requests with valid data fetched from the cloud.</v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    reverse: true
  })
};
</script>