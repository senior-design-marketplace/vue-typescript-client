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
              <v-text-field
                label="Project Card Description"
              ></v-text-field>
            </v-container>
          </v-card>
          <p/>
          <v-card>
            <v-container>
              <br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-image-input
                v-model="imageData"
                :image-quality="0.85"
                imageWidth="500"
                imageHeight="188"
                clearable
                image-format="jpeg"
              />
            </v-container>
          </v-card>
          <p/>
        </div>
        <p/>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card>
          <v-btn outlined block>
            <strong>Submit</strong>
          </v-btn>
        </v-card>
        <p/>
        <v-card>
          <v-col cols="12" sm="6" md="12">
            <h3>Add Project Info:</h3>
            <br>
            <v-textarea
              outlined
              name="description"
              label="Description"
              counter="2048"
              :rules="[rules.length(2048)]"
            ></v-textarea>
            <v-row align="center">
              <v-col cols="12">
                <v-autocomplete
                  v-model="values"
                  :items="majors"
                  outlined
                  dense
                  chips
                  small-chips
                  label="Majors"
                  multiple
                ></v-autocomplete>
                <v-autocomplete
                  v-model="values"
                  :items="tags"
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
            <h3>Add Members:</h3>
            <br>
            <v-autocomplete
              v-model="values"
              :items="advisors"
              outlined
              dense
              chips
              small-chips
              label="Advisors"
              multiple
            ></v-autocomplete>
            <v-autocomplete
              v-model="values"
              :items="students"
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
      majors: [
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
      tags: [
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
      advisors: [
        "Gregg Vesonder",
        "Leslie Brunell",
        "Alex De Rosa",
        "Long Wang",
        "Brendan Englot"
      ],
      students: [
        "Ruthy Levi",
        "Herbie Zieger",
        "Mark Freeman",
        "Vlogger",
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
      }
    };
  }
};
</script>