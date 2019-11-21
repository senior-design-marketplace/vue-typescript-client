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
                  <v-file-input v-model=avatar
                    :rules="[rules.avatarSize]"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Avatar"
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-text-field v-model="title" label="Project Title"></v-text-field>
                </v-col>
              </v-row>
              <v-text-field v-model="tagline" label="Project Card Description"></v-text-field>
            </v-container>
          </v-card>
          <p/>
          <v-card>
            <v-container>
              <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <picture-input
                ref="coverImageInput"
                width="600"
                height="600"
                margin="16"
                accept="image/jpeg, image/png"
                removable="true"
                removeButtonClass="v-btn"
                hideChangeButton="true"
                size="10"
                :custom-strings="{
                    upload: '<h1>Bummer!</h1>',
                    drag: 'Upload a cover photo! 😺'
                  }"
                @change="onChange"
              ></picture-input>
              <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </v-container>
          </v-card>
          <p/>
        </div>
        <p/>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card>
          <v-btn :disabled="dialog" :loading="dialog" outlined block @click="submitProject()">
            <h2>Submit</h2>
          </v-btn>
          <v-dialog v-model="dialog" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                Please stand by
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-card>
        <p/>
        <v-card>
          <v-col cols="12" sm="6" md="12">
            <h2>Add Project Info:</h2>
            <br>
            <v-textarea
              outlined
              v-model="body"
              name="description"
              label="Description"
              counter="2048"
              :rules="[rules.length(2048)]"
            ></v-textarea>
            <v-row align="center">
              <v-col cols="12">
                <v-autocomplete
                  v-model="majors"
                  :items="availableMajors"
                  outlined
                  dense
                  chips
                  small-chips
                  label="Majors"
                  multiple
                ></v-autocomplete>
                <v-autocomplete
                  v-model="tags"
                  :items="availableTags"
                  autocomplete="off"
                  outlined
                  dense
                  chips
                  small-chips
                  label="Tags"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-col>
        </v-card>
        <br>
        <v-card>
          <v-container>
            <h2>Add Members:</h2>
            <br>
            <v-autocomplete
              v-model="advisors"
              :items="availableAdvisors"
              outlined
              dense
              chips
              small-chips
              label="Advisors"
              multiple
            ></v-autocomplete>
            <v-autocomplete
              v-model="students"
              :items="availableStudents"
              outlined
              dense
              chips
              small-chips
              label="Students"
              multiple
            ></v-autocomplete>
          </v-container>
        </v-card>
        <p/>
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
import uuid from "uuid/v4";
import PictureInput from "vue-picture-input";

export default {
  components: {
    ProjectMain,
    ProjectBoard,
    ContactInfo,
    Comments,
    PictureInput
  },
  data() {
    return {
      id: uuid(),
      title: null,
      tagline: null,
      body: null,
      majors: null,
      tags: null,
      advisors: null,
      students: null,
      avatar: null,
      coverImage: null,
      availableMajors: [
        "Software Engineering",
        "Computer Science",
        "Computer Engineering",
        "Mechanical Engineering",
        "Engineering Management",
        "Electrical Engineering",
        "Business and Technology",
        "Civil Engineering",
        "Environmental Engineering",
        "Chemical Engineering",
        "Biomedical Engineering",
        "Music & Technology",
        "Physics",
        "Naval Engineering",
        "Pure and Applied Mathematics",
        "Engineering Physics",
        "Cybersecurity",
        "Chemistry",
        "Biology",
        "Chemical Biology",
        "Computational Science",
        "Industrial and Systems Engineering",
        "Accounting & Analytics",
        "Finance",
        "Quantitative Finance",
        "Marketing Innovation & Analytics",
        "Information Systems",
        "Economics",
        "Management",
        "History",
        "Philosophy",
        "Social Sciences",
        "Literature",
        "Science Communication",
        "Visual Arts & Technology",
        "Science, Technology, and Society"
      ],
      availableTags: [
        "Programming",
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Data Mining",
        "Virtual Reality",
        "Augmented Reality",
        "Automotive",
        "Robotics",
        "Mechatronics /Automation",
        "Thermal / fluids",
        "Aviation / Aerospace Systems",
        "Biomedical",
        "Product Development",
        "Energy / Sustainability",
        "Competition",
        "Thermal / Fluids / Energy Sustainability",
        "Site / Civil Design",
        "Structural",
        "Transportation"
      ],
      availableAdvisors: [
        "Gregg Vesonder",
        "Leslie Brunell",
        "Alex De Rosa",
        "Long Wang",
        "Brendan Englot"
      ],
      availableStudents: [
        "Ruthy Levi",
        "Herbie Zieger",
        "Mark Freeman",
        "Jason Chlus",
        "Julia Cahn",
        "Tyler Lowe",
        "Jakub Kolasinski"
      ],
      rules: {
        avatarSize: value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
        length: len => v =>
          (v || "").length <= len ||
          `Invalid character length, must be less than ${len}`
      },
      dialog: false
    };
  },
  methods: {
    onChange () {
      console.log('New picture selected!')
      if (this.$refs.coverImageInput.file) {
        console.log('Picture loaded.')
        this.coverImage = this.$refs.coverImageInput.file;
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    submitProject() {
      this.dialog = true;
      var url =
        "https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/staging/projects/";
      var body = {
        id: this.id,
        title: this.title,
        tagline: this.tagline,
        body: this.body
      };
      axios
        .post(url, body)
        .then(response => {
          console.log(response.data);
          this.items = response.data;
          this.dialog = false;
          this.$router.push("/project/" + this.id);
        })
        .catch(error => {
          console.log(error);
          this.dialog = false;
          alert("failed");
        });
    }
  },

  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 5000);
    }
  }
};
</script>