<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8">
        <ProjectMain
          v-bind:avatar="thumbnail_link"
          v-bind:title="items.title"
          v-bind:starred="items.starred"
          v-bind:coverImg="cover_link"
          v-bind:description="items.body"
          v-bind:majors="items.requestedMajors"
          v-bind:tags="items.tags"
        />
        <p />
        <ProjectBoard v-bind:boardItems="boardItems" />
      </v-col>
      <v-col cols="12" sm="4">
        <v-card>
          <v-btn outlined block>
            <h2>Apply</h2>
          </v-btn>
        </v-card>
        <p />
        <ContactInfo v-bind:members="items.contributors" v-bind:advisors="items.advisors" />
        <p />
        <Comments v-bind:comments="comments" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProjectBoard from "@/components/ProjectBoard.vue";
import ProjectMain from "@/components/ProjectMain.vue";
import ContactInfo from "@/components/ContactInfo.vue";
import Comments from "@/components/Comments.vue";
import axios from "axios";

export default {
  components: {
    ProjectMain,
    ProjectBoard,
    ContactInfo,
    Comments
  },
  data() {
    return {
      items: [],
      thumbnail_link:
        "https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg",
      cover_link:
        "https://cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg",
      comments: [
        {
          author: "Julia Cahn",
          text: "Example question here?",
          datetime: "Nov 13, 2019 12:00 PM"
        },
        {
          author: "Ruthy Levi",
          text: "What it do bby",
          datetime: "Nov 13, 2019 1:00 PM"
        },
        {
          author: "Herb Zieger",
          text: "Wow this demo looks awesome!",
          datetime: "Nov 13, 2019 12:00 PM"
        },
        {
          author: "Mark Freeman",
          text: "Ooga Booga.",
          datetime: "Nov 13, 2019 12:00 PM"
        },
        {
          author: "Jason Chlus",
          text:
            "Yo guys! Make sure to check out my vlog channel! https://www.youtube.com/channel/UC5UiolKpoLn920GnwidWQDQ",
          datetime: "Nov 13, 2019 12:00 PM"
        },
        {
          author: "Jakub Kolasinski",
          text: "A bad day on the slopes beats a good day at work!",
          datetime: "Nov 13, 2019 12:00 PM"
        },
        {
          author: "Tyler Lowe",
          text: "Have any of you guys seen Jarvis?",
          datetime: "Nov 13, 2019 12:00 PM"
        }
      ],
      boardItems: [
        {
          date: "November 2019",
          desc: "Actually gettting the project board done",
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
    };
  },
  mounted() {
    this.getProjectData();
  },
  methods: {
    getProjectData() {
      var url =
        "https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/staging/projects/" +
        this.$route.params.id;
      axios
        .get(url)
        .then(response => {
          console.log(response.data);
          this.items = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>