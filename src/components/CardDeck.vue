<template>
  <v-container fluid>
    <v-data-iterator :items="items" :items-per-page="50" hide-default-footer>
      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item.idNum">
            <Card
              v-bind:title="item.title"
              v-bind:avatar="item.avatar"
              v-bind:img="item.img"
              v-bind:advisors="item.advisors"
              v-bind:desc="item.desc"
              v-bind:starred="item.starred"
              v-bind:tags="item.tags"
              v-bind:members="item.members"
              v-bind:contact="item.contact"
            ></Card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import Card from "../components/Card.vue";

export default {
  components: {
    Card
  },
  data() {
    return {
      items: [
        {
          id: "1",
          title: "marqetplace.",
          avatar: "https://i.imgur.com/bv3cLys.png",
          img:
            "https://www.lifeofpix.com/wp-content/uploads/2018/04/275-ake6418-jj-jite-001-1600x1000.jpg",
          advisors: ["Vesonder"],
          desc:
            "The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens. The Senior Design Marketplace is a web application that transforms the senior design project selection and organization process into a simple, efficient, and streamlined activity. Using the marketplace, faculty can create and display projects to students who can choose to view or join them. Students are also able to create their own project proposals and submit them for approval by advisors or program coordinators.",
          starred: true,
          tags: [
            "Computer Science",
            "Software Engineering",
            "Engineering Management"
          ],
          members: ["Herb", "Ruthy"],
          contact: "Phone: (+1) 610-428-6898",
        },
        {
          id: "2",
          title: "OutSmartOptions",
          avatar:
            "http://clipart-library.com/new_gallery/22-222186_charging-bull-logo-by-richard-stokes-wall-street.png",
          img:
            "https://cdn.cfo.com/content/uploads/2019/05/GettyImages-962938042-1024x576.jpg",
          advisors: ["Vesonder"],
          desc:
            "OutSmartOptions mission is to provide a technology that helps a client 'Outsmart Options' by helping them make smart options trading decisions.",
          starred: true,
          tags: [
            "Computer Science",
            "Software Engineering",
            "Quantitative Finance",
            "Engineering Management"
          ],
          members: ["Herb", "Ruthy"],
        },
        {
          id: "3",
          title: "Castle Point Rocketry",
          avatar:
            "https://castlepointrocketry.space/wp-content/uploads/2018/07/logo2-1.png",
          img:
            "https://spacequotations.com/wp-content/uploads/2018/08/rocketry-main.jpg",
          advisors: ["Brunell, DeRosa"],
          desc:
            "The ultimate goal in collegiate rocketry is to develop an affordable ground-launched platform capable of surpassing the Karman Line (an altitude of 100 km).",
          starred: true,
          tags: [
            "Computer Engineering",
            "Computer Science",
            "Chemical Engineering",
            "Mechanical Engineering"
          ]
        },
        {
          id: "4",
          title: "AlzFall",
          avatar:
            "https://images.vexels.com/media/users/3/167024/isolated/preview/cb2ad965aa4c8b6115c8b1fac49c28fc-alzheimer-s-awareness-ribbon-badge-sticker-by-vexels.png",
          img:
            "https://www.universityofcalifornia.edu/sites/default/files/alzheimer-theory-uc-riverside.jpg",
          advisors: ["Vesonder"],
          desc:
            "AlzFall's mission is to provide a technology that will help those who have been diagnosed with Alzeimer's disease.",
          starred: true,
          tags: [
            "Electrical Engineering",
            "Computer Science",
            "Software Engineering",
            "Mechanical Engineering"
          ]
        },
        {
          id: "5",
          title: "Life Skills Software",
          avatar:
            "https://peopleforeducation.ca/wp-content/uploads/2017/05/PFE_Icon_Public-education.png",
          img:
            "https://www.northeastern.edu/graduate/blog/wp-content/uploads/2019/06/Equity-in-the-Classroom-HERO.jpeg",
          advisors: ["Vesonder"],
          desc:
            "Our platform gamifies developing skills critical for special-needs students, namely across three broad categories: academic, social, and transitional.",
          starred: true,
          tags: [
            "Computer Science",
            "Software Engineering",
            "Engineering Management"
          ]
        },
        {
          id: "6",
          title: "EVisualize",
          avatar:
            "https://s3.amazonaws.com/dntstatic//4294a95c-62de-46b8-53e2-f575b513d793_122_120.png",
          img:
            "https://assets.greentechmedia.com/assets/content/cache/made/assets/content/cache/remote/https_assets.greentechmedia.com/content/images/articles/Charging_EVs_Infrastructure_XL_721_420_80_s_c1.jpg",
          advisors: ["Vesonder"],
          desc:
            "For electric vehicle drivers who need a more convenient way to charge their EVs, the EVisualize module is an add-on to the Liberty Hydra app that optimizes charger usage for both users and facilities managers.",
          starred: true,
          tags: ["Computer Engineering", "Electrical Engineering"]
        }
      ]
    };
  }
};
</script>