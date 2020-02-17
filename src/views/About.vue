<template>
  <v-container>
    <br />
    <h1>About Us</h1>
    <br />
    <v-row>
      <v-col cols="12" sm="8">
        <div>
          <v-card>
            <v-container>
              <h2>Mission Statement</h2>
              <br />
              <div class="text-start">
                For students and advisors who currently lack a centralized application to organize
                senior design projects, Marqetplace is a decentralized cloud-native application
                suite that acts as a drop-in solution for organizations that allow users to submit,
                join and keep up with the projects in which they are interested.
              </div>
              <br />
              <div class="text-start">
                Unlike the current senior design organization system, which varies by department and
                is not transparent for students, our product is fully available for all participants
                so that students can learn and inquire about projects across disciplines and engage
                more fully with other groups throughout the year.
              </div>
              <br />
              <h2>Project Scope</h2>
              <br />
              <div class="text-start">
                The current team formation process frequently causes delays to the Senior Design
                schedule due to conflicting practices between departments, manual reorganization in
                each section, and lack of early communication with students. These delays and the
                interdepartmental lack of communication result in rushed team formation on behalf of
                advisors and lack of complete project choice for students. The Marqetplace team aims
                to build a platform for users, including students and advisors, to facilitate the
                project selection process. This web technology will act as a drop-in solution to
                allow students and advisors to keep up with the projects they are interested in.
                They will be able to submit and join projects as well as update viewers on project
                progress. Future versions of this platform will include the ability to fully
                integrate with Canvas for further automation, so that advisors can make a change in
                one system that will translate into the other. Unfortunately, that integration does
                not currently fit into the 2019-2020 timeline of this project.
              </div>
              <br />
              <h2>Project Description</h2>
              <br />
              <div class="text-start">
                Currently, there is no centralized, organized system for finding and selecting a
                senior design project for Stevens Institute of Technology and other universities.
                Students and advisors must collaborate through unorganized means, meaning that
                interdisciplinary teams are difficult to form. We are building a platform for users,
                including students and advisors, to facilitate the project selection process. This
                web technology will act as a drop-in solution to allow students and advisors to keep
                up with the projects they are interested in. They will be able to submit and join
                projects as well as update viewers on project progress.
                <br />
              </div>
              <br />
              <h2>Objective</h2>
              <br />
              <div class="text-start">
                Marqetplace is designed to help students and advisors of colleges who want a more
                reliable and robust senior year experience by creating an online hub for organizing
                and interacting with senior design teams and projects. Our platform will assist team
                formation and project visibility, leading to increased student engagement across
                disciplines and a single, streamlined team formation process for advisors.
              </div>
            </v-container>
          </v-card>
          <p />
        </div>
        <p />
      </v-col>
      <v-col cols="12" sm="4">
        <v-card>
          <v-col cols="12" sm="6" md="12">
            <h2>Advisors</h2>
            <br />
            <v-btn fab x-large dark v-on:click="shown = 'Gregg'">
              <v-avatar size="75">
                <img :src="require('@/../public/assets/Gregg.png')" height="50px" />
              </v-avatar>
            </v-btn>
&nbsp;
            <v-btn fab x-large dark v-on:click="shown = 'Eirik'">
              <v-avatar size="75">
                <img :src="require('@/../public/assets/Eirik.jpg')" height="50px" />
              </v-avatar>
            </v-btn>
            <br />
            <br />
            <h2>Meet The Team</h2>
            <br />
            <v-btn fab x-large dark v-on:click="shown = 'Herb'">
              <v-avatar size="75">
                <img :src="require('@/../public/assets/Herb.jpg')" height="50px" />
              </v-avatar>
            </v-btn>&nbsp;
            <v-btn fab x-large dark v-on:click="shown = 'Ruthy'">
              <v-avatar size="75">
                <img :src="require('@/../public/assets/Ruthy.jpg')" height="50px" />
              </v-avatar>
            </v-btn>&nbsp;
            <v-btn fab x-large dark v-on:click="shown = 'Jason'">
              <v-avatar size="75">
                <img :src="require('@/../public/assets/Jason.jpg')" height="50px" />
              </v-avatar>
            </v-btn>&nbsp;
            <v-btn fab x-large dark v-on:click="shown = 'Mark'">
              <v-avatar size="75">
                <img :src="require('@/../public/assets/Mark.jpg')" height="50px" />
              </v-avatar>
            </v-btn>&nbsp;
            <v-btn fab x-large dark v-on:click="shown = 'Julia'">
              <v-avatar size="75">
                <img :src="require('@/../public/assets/Julia.jpg')" height="50px" />
              </v-avatar>
            </v-btn>&nbsp;
            <v-btn fab x-large dark v-on:click="shown = 'Jakub'">
              <v-avatar size="75">
                <img :src="require('@/../public/assets/Jakub.jpg')" height="50px" />
              </v-avatar>
            </v-btn>&nbsp;
            <v-btn fab x-large dark v-on:click="shown = 'Tyler'">
              <v-avatar size="75">
                <img :src="require('@/../public/assets/Tyler.jpg')" height="50px" />
              </v-avatar>
            </v-btn>&nbsp;
            <br />
            <br />

            <v-card v-if="shown == 'Gregg'">
              <img :src="require('@/../public/assets/Gregg.png')" height="250px" />
              <v-card-title>Dr. Gregg Vesonder</v-card-title>
              <v-card-text>
                <div>Short Description</div>
              </v-card-text>
            </v-card>

            <v-card v-if="shown == 'Eirik'">
              <img :src="require('@/../public/assets/Eirik.jpg')" height="250px" />
              <v-card-title>Eirik Hole</v-card-title>
              <v-card-text>
                <div>Short Description</div>
              </v-card-text>
            </v-card>

            <v-card v-if="shown == 'Herb'">
              <img :src="require('@/../public/assets/Herb.jpg')" height="250px" />
              <v-card-title>Herb Zieger</v-card-title>
              <v-card-text>
                <div>
                  Major: Software Engineering
                  <br />Graduation Year: 2020
                  <br />Clubs/involvements: I have worked at the
                  Maritime Security Center at Stevens since 2018
                  assisting research in drones, remote sensing,
                  and homeland security.
                  <br />Interests/passions: Gaming/VR, Coding, Flying Drones,
                  Electric Scooters, Model Trains
                  <br />Job after: GTP Analyst at UBS
                </div>
              </v-card-text>
            </v-card>

            <v-card v-if="shown == 'Ruthy'">
              <img :src="require('@/../public/assets/Ruthy.jpg')" height="250px" />
              <v-card-title>Ruthy Levi</v-card-title>
              <v-card-text>
                <div>
                  Major: Software Engineering
                  <br />Graduation Year: 2020
                  <br />Clubs/involvements: SWE, SWICS, Amnesty International, Poetry Club, Software
                  Engineering Club
                  <br />Interests/passions: Barre (fusion of pilates+yoga+ballet), cooking,
                  paddle-boarding, options trading, biking, theatre
                  <br />Job after: Will be in the Technology Advisory Program at EY (Ernst & Young)
                  <br />Inspirational quote:
                </div>
              </v-card-text>
            </v-card>

            <v-card v-if="shown == 'Jason'">
              <img :src="require('@/../public/assets/Jason.jpg')" height="250px" />
              <v-card-title>Jason Chlus</v-card-title>
              <v-card-text>
                <div>
                  Major: Software Engineering
                  <br />Graduation Year: 2020
                  <br />Clubs/involvements: I was involved with the Student Government,
                  Lacrosse club, Sigma Phi Epsilon, Russian club, ex.
                  <br />Interests/passions: I enjoy reading and learning new things.
                  I also enjoy spending time with people and exercising ex.
                  <br />Job after: I dont have a job after college yet
                  <br />Inspirational quote: "College is the time to push
                  yourself, try new and challenging things"
                </div>
              </v-card-text>
            </v-card>

            <v-card v-if="shown == 'Mark'">
              <img :src="require('@/../public/assets/Mark.jpg')" height="250px" />
              <v-card-title>Mark Freeman</v-card-title>
              <v-card-text>
                <div>
                  Graduation Year: May 2020
                  <br />Clubs/involvements: I helped lead a series of
                  on-campus hackathons to further the
                  entrepreneurial interests of Stevens students. I also work in the machine
                  laboratory, where we assist students with bringing engineering concepts into
                  reality through manufacturing.
                  <br />Interests/passions: I am interested in woodworking, machining, and applied
                  electronics outside of Stevens.
                  <br />Job after: I plan to continue on to graduate school
                  if I am admitted. If not, I
                  will join Amazon as an SDE I for the ReCommerce platform.
                  <br />
                </div>
              </v-card-text>
            </v-card>

            <v-card v-if="shown == 'Julia'">
              <img :src="require('@/../public/assets/Julia.jpg')" height="250px" />
              <v-card-title>Julia Cahn</v-card-title>
              <v-card-text>
                <div>
                  Major:
                  <br />Graduation Year:
                  <br />Clubs/involvements:
                  <br />Interests/passions:
                  <br />Job after:
                  <br />Inspirational quote:
                </div>
              </v-card-text>
            </v-card>

            <v-card v-if="shown == 'Jakub'">
              <img :src="require('@/../public/assets/Jakub.jpg')" height="250px" />
              <v-card-title>Jakub Kolasinski</v-card-title>
              <v-card-text>
                <div>
                  Major: Engineering Management
                  <br />Graduation Year: May 2020
                  <br />Clubs/involvements: I was involved with the Stevens Society of
                  Automotive Engineers and Chi Phi fraternity.
                  <br />Interests/passions: In my free time, I like to ride BMX and snowboard.
                  <br />Job after: I plan to receive my Master's degree in Financial Analytics
                  from Stevens before 2021, and would like to
                  start a career in finance upon completion.
                  <br />Inspirational quote: "Fifty percent of something is better
                  than a hundred percent of nothing."
                </div>
              </v-card-text>
            </v-card>

            <v-card v-if="shown == 'Tyler'">
              <img :src="require('@/../public/assets/Tyler.jpg')" height="250px" />
              <v-card-title>Tyler Lowe</v-card-title>
              <v-card-text>
                <div>
                  Major: Engineering Management
                  <br />Graduation Year: May 2020
                  <br />Clubs/involvements: Chi Phi
                  <br />Interests/passions: Working out, hanging out with my cat, Jarvis
                  <br />Job after: Still Looking
                  <br />Inspirational quote: in the works
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-card>
        <br />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      shown: '',
    };
  },
};
</script>
