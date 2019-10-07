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
            :key="item.idNum"
          >
            <Card
                v-bind:title=item.title
                v-bind:avatar=item.avatar
                v-bind:img=item.img
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
            avatar: "https://lh3.google.com/u/0/d/1pmiS_zouaeok8JDWFLZSTieLF_JE6OOSu9wA5Cr1SQY=w200-h190-p-k-nu-iv1",
            img: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
            advisors: ['Vesonder'],
            desc: "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens.",
            starred: true,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
          {
            id: "2",
            title: "different.",
            avatar: "https://lh3.google.com/u/0/d/1pmiS_zouaeok8JDWFLZSTieLF_JE6OOSu9wA5Cr1SQY=w200-h190-p-k-nu-iv1",
            img: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
            advisors: ['Vesonder'],
            desc: "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens.",
            starred: true,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
          {
            id: "3",
            title: "marqetplace.",
            avatar: "https://lh3.google.com/u/0/d/1pmiS_zouaeok8JDWFLZSTieLF_JE6OOSu9wA5Cr1SQY=w200-h190-p-k-nu-iv1",
            img: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
            advisors: ['Vesonder'],
            desc: "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens.",
            starred: true,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
          {
            id: "4",
            title: "marqetplace.",
            avatar: "https://lh3.google.com/u/0/d/1pmiS_zouaeok8JDWFLZSTieLF_JE6OOSu9wA5Cr1SQY=w200-h190-p-k-nu-iv1",
            img: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
            advisors: ['Vesonder'],
            desc: "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens.",
            starred: true,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
          {
            id: "5",
            title: "marqetplace.",
            avatar: "https://lh3.google.com/u/0/d/1pmiS_zouaeok8JDWFLZSTieLF_JE6OOSu9wA5Cr1SQY=w200-h190-p-k-nu-iv1",
            img: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
            advisors: ['Vesonder'],
            desc: "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens.",
            starred: true,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
          {
            id: "6",
            title: "marqetplace.",
            avatar: "https://lh3.google.com/u/0/d/1pmiS_zouaeok8JDWFLZSTieLF_JE6OOSu9wA5Cr1SQY=w200-h190-p-k-nu-iv1",
            img: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
            advisors: ['Vesonder'],
            desc: "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens.",
            starred: true,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
          {
            id: "7",
            title: "marqetplace.",
            avatar: "https://lh3.google.com/u/0/d/1pmiS_zouaeok8JDWFLZSTieLF_JE6OOSu9wA5Cr1SQY=w200-h190-p-k-nu-iv1",
            img: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
            advisors: ['Vesonder'],
            desc: "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens.",
            starred: true,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
          {
            id: "8",
            title: "marqetplace.",
            avatar: "https://lh3.google.com/u/0/d/1pmiS_zouaeok8JDWFLZSTieLF_JE6OOSu9wA5Cr1SQY=w200-h190-p-k-nu-iv1",
            img: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
            advisors: ['Vesonder'],
            desc: "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens.",
            starred: true,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
          {
            id: "9",
            title: "marqetplace.",
            avatar: "https://lh3.google.com/u/0/d/1pmiS_zouaeok8JDWFLZSTieLF_JE6OOSu9wA5Cr1SQY=w200-h190-p-k-nu-iv1",
            img: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
            advisors: ['Vesonder'],
            desc: "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens.",
            starred: false,
            tags: ['Computer Science', 'Software Eng.', 'Engineering Management'],
          },
        ],
      }
    },
  }
</script>