<template>
  <v-card>
    <v-item-group>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline text-left">Project Board</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-item-group>
    <v-container fluid>
      <v-data-iterator :items="items" :items-per-page="50" hide-default-footer>
        <template v-slot:default="props">
          <v-timeline :reverse="false" dense>
            <v-timeline-item v-for="item in props.items" :key="item.id">
              <BoardBlock v-bind:date="item.date" v-bind:desc="item.desc" v-bind:img="item.img"></BoardBlock>
            </v-timeline-item>
          </v-timeline>
        </template>
      </v-data-iterator>
    </v-container>
  </v-card>
</template>

<script>
import BoardBlock from "../components/BoardBlock.vue";

export default {
  components: {
    BoardBlock
  },
  data: () => ({
    items: [
      {
        date: "November 2019",
        desc:
          "Actually gettting the project board done",
        img: []
      },
      {
        date: "October 2019",
        desc:
          "Simple UI generation from client in response to a live call from the server. Initial UI mockups for web client finished and handed over to SDEs.",
        img: []
      },
      {
        date: "September 2019",
        desc:
          "Schemas validated and initial routes stubbed for future implementation. Requirements validation with EMs and generation of an ordered product backlog. Developer middlewares and other tooling written to facilitate further development. Server capable of being stood up and responding to simple requests with valid data fetched from the cloud."
      }
    ]
  })
};
</script>