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
            img: "https://turntable.kagiso.io/images/pexels-photo-1061588.width-800.jpg",
            advisors: ['Vesonder'],
            desc: "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens.",
            starred: true,
            tags: ['Computer Science', 'Software Engineering', 'Engineering Management'],
          },
          {
            id: "2",
            title: "OutSmartOptions",
            avatar: "https://legacy.simplywall.st/images/simplywallst_square512white.png",
            img: "https://cdn.cfo.com/content/uploads/2019/05/GettyImages-962938042-1024x576.jpg",
            advisors: ['Vesonder'],
            desc: "OutSmartOptions mission is to provide a technology that helps a client 'Outsmart Options' by helping them make smart options trading decisions.",
            starred: true,
            tags: ['Computer Science', 'Software Engineering', 'Quantitative Finance', 'Engineering Management'],
          },
          {
            id: "3",
            title: "AlzFall",
            avatar: "https://images.vexels.com/media/users/3/167024/isolated/preview/cb2ad965aa4c8b6115c8b1fac49c28fc-alzheimer-s-awareness-ribbon-badge-sticker-by-vexels.png",
            img: "https://www.universityofcalifornia.edu/sites/default/files/alzheimer-theory-uc-riverside.jpg",
            advisors: ['Vesonder'],
            desc: "AlzFall's mission is to provide a technology that will help those who have been diagnosed with Alzeimer's disease.",
            starred: true,
            tags: ['Electrical Engineering', 'Computer Science', 'Software Engineering', 'Mechanical Engineering'],
          },
          {
            id: "4",
            title: "AlzFall",
            avatar: "https://images.vexels.com/media/users/3/167024/isolated/preview/cb2ad965aa4c8b6115c8b1fac49c28fc-alzheimer-s-awareness-ribbon-badge-sticker-by-vexels.png",
            img: "https://www.universityofcalifornia.edu/sites/default/files/alzheimer-theory-uc-riverside.jpg",
            advisors: ['Vesonder'],
            desc: "AlzFall's mission is to provide a technology that will help those who have been diagnosed with Alzeimer's disease.",
            starred: true,
            tags: ['Electrical Engineering', 'Computer Science', 'Software Engineering', 'Mechanical Engineering'],
          },
          {
            id: "5",
            title: "OutSmartOptions",
            avatar: "https://legacy.simplywall.st/images/simplywallst_square512white.png",
            img: "https://cdn.cfo.com/content/uploads/2019/05/GettyImages-962938042-1024x576.jpg",
            advisors: ['Vesonder'],
            desc: "OutSmartOptions mission is to provide a technology that helps a client 'Outsmart Options' by helping them make smart options trading decisions.",
            starred: true,
            tags: ['Computer Science', 'Software Engineering', 'Quantitative Finance', 'Engineering Management'],
          },
          {
            id: "6",
            title: "marqetplace.",
            avatar: "https://lh3.google.com/u/0/d/1pmiS_zouaeok8JDWFLZSTieLF_JE6OOSu9wA5Cr1SQY=w200-h190-p-k-nu-iv1",
            img: "https://turntable.kagiso.io/images/pexels-photo-1061588.width-800.jpg",
            advisors: ['Vesonder'],
            desc: "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens.",
            starred: true,
            tags: ['Computer Science', 'Software Engineering', 'Engineering Management'],
          },
        ],
      }
    },
  }
</script>