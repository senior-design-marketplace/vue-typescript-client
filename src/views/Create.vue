<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8">
        <h1>Create Project</h1>
        <br>
        <div>
          <v-card>
            <v-container>
              <v-row>
                <v-col cols="12" sm="3">
                  <v-file-input
                    :rules="rules.avatarSize"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Avatar"
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-text-field label="Project Title"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <p/>
          <v-card>
            <v-container>
              <v-image-input
                v-model="imageData"
                :image-quality="0.85"
                imageWidth="500"
                clearable
                image-format="jpeg"
              />
            </v-container>
          </v-card>
          <p/>
          <v-card>
            <v-container>
              <v-col cols="12" sm="6" md="12">
                <v-textarea
                  outlined
                  name="description"
                  label="Description"
                  counter="2048"
                  :rules="[rules.length(2048)]"
                ></v-textarea>
              </v-col>
              <v-list-item-title class="headline text-left">Majors:</v-list-item-title>
              <v-chip-group column>
                <v-chip label v-for="major in majors" :key="major" class="noClick">{{major}}</v-chip>
              </v-chip-group>
              <v-list-item-title class="headline text-left">Tags:</v-list-item-title>
              <v-chip-group column>
                <v-chip label v-for="tag in tags" :key="tag" class="noClick">{{tag}}</v-chip>
              </v-chip-group>
            </v-container>
          </v-card>
        </div>
        <p/>
        <ProjectBoard v-bind:boardItems="boardItems"/>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card>
          <v-btn outlined block>
            <strong>Submit</strong>
          </v-btn>
        </v-card>
        <p/>
        <ContactInfo v-bind:members="items.contributors" v-bind:advisors="items.advisors"/>
        <p/>
        <Comments v-bind:comments="comments"/>
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
import VImageInput from "vuetify-image-input/a-la-carte";

export default {
  components: {
    ProjectMain,
    ProjectBoard,
    ContactInfo,
    Comments,
    VImageInput
  },
  data() {
    return {
      rules: {
        avatarSize: value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
        length: len => v =>
          (v || "").length <= len ||
          `Invalid character length, must be less than ${len}`
      },
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
          text: "Example response here!",
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