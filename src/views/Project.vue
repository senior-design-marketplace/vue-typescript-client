<template>
  <div>
    <h1>This is the project {{ $route.params.id }} page</h1>
    <v-row justify="end">
      <v-btn>Apply</v-btn>
    </v-row>
    <ProjectMain
      v-bind:avatar="avatar"
      v-bind:title="title"
      v-bind:starred="starred"
      v-bind:coverImg="coverImg"
      v-bind:description="description"
      v-bind:majors="majors"
      v-bind:tags="tags"
    ></ProjectMain>
    <ProjectBoard></ProjectBoard>
  </div>
</template>

<script>
import ProjectBoard from "@/components/ProjectBoard.vue";
import ProjectMain from "@/components/ProjectMain.vue";
export default {
  components: {
    ProjectMain,
    ProjectBoard
  },
  data() {
    return {
      title: "Google Project",
      avatar:
        "https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg",
      starred: true,
      coverImg:
        "https://cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg",
      description:
        "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook.[9][10] Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002.[11] An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet.",
      majors: [
        ["Computer Science", "3"],
        ["Software Engineering", "2"],
        ["Computer Engineering", "4"]
      ],
      tags: [
        "Programming",
        "Data Science",
        "Networking",
        "Information Technology"
      ]
    };
  }
};
</script>