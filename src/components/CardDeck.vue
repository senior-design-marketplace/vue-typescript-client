<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page="50"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.id"
          >
            <Card
                v-bind:title=item.title
                v-bind:avatar=item.avatar
                v-bind:advisors=item.advisors
                v-bind:desc=item.desc
                v-bind:starred=item.starred
                v-bind:tags=item.tags
            ></Card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import Card from '../components/Card.vue';

  export default {
  components: {
    Card,
  },
    data () {
      return {
        items: [
          {
            id: "1",
            title: "marqetplace.",
            avatar: "http://localhost:8080/img/logo.f7e6a745.png",
            advisors: ['Vesonder'],
            desc: "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens.",
            starred: true,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
          {
            id: "2",
            title: "Bing",
            avatar: "https://image.flaticon.com/icons/svg/174/174838.svg",
            advisors: ['Advisor'],
            desc: "Short descriptions don't get cut off",
            starred: false,
            tags: ['Mechanical Eng.', 'Electrical Eng.'],
          },
          {
            id: "3",
            title: "Google",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
            advisors: ['ABC', '123'],
            desc: "Long descriptions get cut off. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            starred: true,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
          {
            id: "4",
            title: "marqetplace.",
            avatar: "http://localhost:8080/img/logo.f7e6a745.png",
            advisors: ['Vesonder'],
            desc: "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens.",
            starred: true,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
          {
            id: "5",
            title: "Bing",
            avatar: "https://image.flaticon.com/icons/svg/174/174838.svg",
            advisors: ['Advisor'],
            desc: "Short descriptions don't get cut off",
            starred: false,
            tags: ['Mechanical Eng.', 'Electrical Eng.'],
          },
          {
            id: "6",
            title: "Google",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
            advisors: ['ABC', '123'],
            desc: "Long descriptions get cut off. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            starred: true,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
          {
            id: "7",
            title: "marqetplace.",
            avatar: "http://localhost:8080/img/logo.f7e6a745.png",
            advisors: ['Vesonder'],
            desc: "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens.",
            starred: true,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
          {
            id: "8",
            title: "Bing",
            avatar: "https://image.flaticon.com/icons/svg/174/174838.svg",
            advisors: ['Advisor'],
            desc: "Short descriptions don't get cut off",
            starred: false,
            tags: ['Mechanical Eng.', 'Electrical Eng.'],
          },
          {
            id: "9",
            title: "Google",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
            advisors: ['ABC', '123'],
            desc: "Long descriptions get cut off. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            starred: true,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
        ],
      }
    },
  }
</script>