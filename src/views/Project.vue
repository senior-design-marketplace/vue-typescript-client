<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8">
        <ProjectMain
          v-bind:avatar="items.thumbnail_link"
          v-bind:title="items.title"
          v-bind:starred="items.starred"
          v-bind:coverImg="items.cover_link"
          v-bind:tagline="items.tagline"
          v-bind:description="items.body"
          v-bind:majors="items.requestedMajors"
          v-bind:tags="items.tags"
          v-bind:acceptingApps="items.acceptingApplications"
          v-bind:onProject="onProject"
          v-bind:isAdmin="isAdmin"
        />
        <p />
        <ProjectBoard v-bind:boardItems="boardItems" />
      </v-col>
      <v-col cols="12" sm="4">
        <Apply
          v-bind:title="items.title"
          v-bind:acceptingApps="items.acceptingApplications"
          v-bind:onProject="onProject"
        />
        <p />
        <ContactInfo
          v-bind:title="items.title"
          v-bind:members="members"
          v-bind:advisors="advisors"
          v-bind:administrators="items.administrators"
        />
        <p />
        <Comments @comment="updateComments" v-bind:comments="comments" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import ProjectBoard from '@/components/ProjectBoard.vue';
import ProjectMain from '@/components/ProjectMain.vue';
import ContactInfo from '@/components/ContactInfo.vue';
import Comments from '@/components/Comments.vue';
import Apply from '@/components/Apply.vue';
import store from '@/store';

export default {
  components: {
    ProjectMain,
    ProjectBoard,
    ContactInfo,
    Comments,
    Apply,
  },
  data() {
    return {
      items: [],
      comments: [
        {
          author: 'Julia Cahn',
          text: 'Example question here?',
          datetime: 'Nov 13, 2019 12:00 PM',
        },
        {
          author: 'Ruthy Levi',
          text: 'What it do bby',
          datetime: 'Nov 13, 2019 1:00 PM',
        },
        {
          author: 'Herb Zieger',
          text: 'Wow this demo looks awesome!',
          datetime: 'Nov 13, 2019 12:00 PM',
        },
        {
          author: 'Mark Freeman',
          text: 'Ooga Booga.',
          datetime: 'Nov 13, 2019 12:00 PM',
        },
        {
          author: 'Jason Chlus',
          text:
            'Yo guys! Make sure to check out my vlog channel! https://www.youtube.com/channel/UC5UiolKpoLn920GnwidWQDQ',
          datetime: 'Nov 13, 2019 12:00 PM',
        },
        {
          author: 'Jakub Kolasinski',
          text: 'A bad day on the slopes beats a good day at work!',
          datetime: 'Nov 13, 2019 12:00 PM',
        },
        {
          author: 'Tyler Lowe',
          text: 'Have any of you guys seen Jarvis?',
          datetime: 'Nov 13, 2019 12:00 PM',
        },
      ],
      boardItems: [
        {
          date: 'November 2019',
          desc: 'Actually gettting the project board done',
          img: [],
        },
        {
          date: 'October 2019',
          desc:
            'Simple UI generation from client in response to a live call from the server. Initial UI mockups for web client finished and handed over to SDEs.',
          img: [],
        },
        {
          date: 'September 2019',
          desc:
            'Schemas validated and initial routes stubbed for future implementation. Requirements validation with EMs and generation of an ordered product backlog. Developer middlewares and other tooling written to facilitate further development. Server capable of being stood up and responding to simple requests with valid data fetched from the cloud.',
        },
      ],
    };
  },
  mounted() {
    this.getProjectData();
  },
  methods: {
    getProjectData() {
      const url = `https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/staging/projects/${this.$route.params.id}`;
      axios
        .get(url)
        .then((response) => {
          // console.log(response.data);
          this.items = response.data;
        })
        .catch((error) => {
          // console.log(error);
        });
    },
    updateComments(variable) {
      const newComment = {
        author: 'Test User',
        text: variable,
        datetime: 'Nov 5, 2019 2:45 PM',
      };
      // console.log(this.comments);
      // console.log(newComment);
      this.comments = this.comments.concat(newComment);
      // console.log(this.comments);
    },
  },
  computed: {
    members() {
      if (this.items.administrators === undefined || this.items.administrators === undefined) {
        return [];
      }
      return this.items.administrators
        .filter(admin => !admin.isAdvisor)
        .concat(
          this.items.contributors.filter(
            contrib => JSON.stringify(this.items.administrators).indexOf(contrib.id) === -1,
          ),
        );
    },
    advisors() {
      if (this.items.administrators === undefined) return [];
      return this.items.administrators.filter(admin => admin.isAdvisor);
    },
    onProject() {
      return (
        store.state.cognitoUsername !== ''
        && JSON.stringify(this.members).indexOf(store.state.cognitoUsername) > -1
      );
    },
    isAdmin() {
      return (
        store.state.cognitoUsername !== ''
        && JSON.stringify(this.items.administrators).indexOf(store.state.cognitoUsername) > -1
      );
    },
  },
};
</script>
