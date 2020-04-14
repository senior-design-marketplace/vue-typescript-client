<template>
  <v-container>
    <br /><br /><br />
    <v-hover v-if="step === 0" v-slot:default="{ hover }">
      <v-card
        v-if="$route.params.id === undefined"
        class="mx-auto"
        width="600"
        @click="step = 1"
        style="cursor:pointer;"
        :elevation="hover ? 12 : 4"
        :ripple="false"
      >
        <div>
          <v-img contain max-height="500" :src="require('@/../public/assets/createProject.svg')" />
          <h1><h2>Get Started</h2></h1>
        </div>
      </v-card>
      <Loading v-else value="Loading Project" />
    </v-hover>
    <v-card v-else class="mx-auto" width="1185">
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step
            :complete="step > 1"
            step="1"
            :editable="oneCompleted"
            :edit-icon="oneCompleted ? 'mdi-check' : 'mdi-close'"
          >
            Basics
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :complete="step > 2"
            step="2"
            :editable="oneCompleted"
            :edit-icon="twoCompleted ? 'mdi-check' : 'mdi-close'"
          >
            Tags & Majors
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :complete="step > 3"
            step="3"
            :editable="oneCompleted"
            :edit-icon="threeCompleted ? 'mdi-check' : 'mdi-close'"
          >
            Media
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :complete="step > 4"
            step="4"
            :editable="oneCompleted"
            :edit-icon="fourCompleted ? 'mdi-check' : 'mdi-close'"
          >
            Members
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-toolbar dense class="mx-3">
              <v-toolbar-title>
                <v-icon v-if="!loading" color="success">
                  mdi-check
                </v-icon>
                <v-progress-circular v-else color="primary" indeterminate />
                The Basics
              </v-toolbar-title>
            </v-toolbar>
            <v-container>
              <v-card class="mx-auto mb-12">
                <v-container v-if="!oneCompleted">
                  <v-textarea
                    class="mx-1"
                    rows="1"
                    counter="64"
                    outlined
                    label="Title"
                    v-model="projectDetails.title"
                    :rules="[rules.length(64)]"
                  />
                  <v-textarea
                    class="mx-1"
                    rows="3"
                    counter="256"
                    outlined
                    label="Tagline"
                    v-model="projectDetails.tagline"
                    :rules="[rules.length(256)]"
                  />
                  <v-textarea
                    class="mx-1"
                    rows="15"
                    counter="2048"
                    outlined
                    label="Description"
                    v-model="projectDetails.body"
                    :rules="[rules.length(2048)]"
                  />
                </v-container>
                <v-container v-else>
                  <v-textarea
                    class="mx-1"
                    rows="1"
                    counter="64"
                    outlined
                    label="Title"
                    v-model="projectDetails.title"
                    :rules="[rules.length(64)]"
                    @input="updateTitle"
                  />
                  <v-textarea
                    class="mx-1"
                    rows="3"
                    counter="256"
                    outlined
                    label="Tagline"
                    v-model="projectDetails.tagline"
                    :rules="[rules.length(256)]"
                    @input="updateTagline"
                  />
                  <v-textarea
                    class="mx-1"
                    rows="15"
                    counter="2048"
                    outlined
                    label="Description"
                    v-model="projectDetails.body"
                    :rules="[rules.length(2048)]"
                    @input="updateDescription"
                  />
                </v-container>
              </v-card>
            </v-container>
            <v-btn
              v-if="!oneCompleted"
              color="primary"
              :disabled="basicsInvalid"
              @click="submitProject"
            >
              <h1>Create & Continue</h1>
            </v-btn>
            <v-btn v-else color="primary" :disabled="basicsInvalid" @click="step = 2">
              <h1>Continue</h1>
            </v-btn>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-toolbar dense class="mx-3">
              <v-toolbar-title>
                <v-icon v-if="!loading" color="success">
                  mdi-check
                </v-icon>
                <v-progress-circular v-else color="primary" indeterminate />
                Tags & Majors
              </v-toolbar-title>
            </v-toolbar>
            <v-container>
              <v-card class="mx-auto mb-12">
                <v-container>
                  <v-autocomplete
                    v-model="projectDetails.requestedMajors"
                    :items="availableMajors"
                    outlined
                    chips
                    clearable
                    label="Majors"
                    multiple
                    @change="updateMajors"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        close
                        label
                        color="secondary"
                        @click="data.select"
                        @click:close="removeMajor(data.item)"
                      >
                        {{ data.item }}
                      </v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template>
                        <v-list-item-content v-text="data.item"></v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                  <v-autocomplete
                    v-model="projectDetails.tags"
                    :items="availableTags"
                    outlined
                    chips
                    clearable
                    label="Tags"
                    multiple
                    @change="updateTags"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        close
                        label
                        color="primary"
                        @click="data.select"
                        @click:close="removeTag(data.item)"
                      >
                        {{ data.item }}
                      </v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template>
                        <v-list-item-content v-text="data.item"></v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-container>
              </v-card>
              <v-btn color="primary" class="mx-1" @click="step = 3" :disabled="!twoCompleted">
                <h1>Continue</h1>
              </v-btn>
              <v-btn class="mx-1" @click="step = 3">
                <h1>Skip</h1>
              </v-btn>
            </v-container>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-toolbar dense class="mx-3">
              <v-toolbar-title>
                <v-icon v-if="!loading" color="success">
                  mdi-check
                </v-icon>
                <v-progress-circular v-else color="primary" indeterminate />
                Media
              </v-toolbar-title>
            </v-toolbar>
            <v-container>
              <v-card>
                <v-row>
                  <v-col>
                    <v-container>
                      <v-hover v-slot:default="{ hover }" style="cursor:pointer;">
                        <v-avatar
                          @click.stop="thumbnailDialog = true"
                          size="200"
                          :color="projectDetails.thumbnailLink !== null ? undefined : 'primary'"
                        >
                          <v-img
                            v-if="projectDetails.thumbnailLink !== null"
                            :src="projectDetails.thumbnailLink"
                          />
                          <v-icon v-else size="125" dark>mdi-account-circle</v-icon>
                          <v-overlay :value="hover" absolute opacity="0.75">
                            <v-container class="white--text headline"
                              >Click to change thumbnail.</v-container
                            >
                          </v-overlay>
                        </v-avatar>
                      </v-hover>
                      <MediaUpload
                        v-model="thumbnailDialog"
                        :path="`/projects/${this.$route.params.id}/thumbnail`"
                        title="Thumbnail Upload"
                        types="image/jpeg, image/png"
                        :avatar="true"
                        @file="hotswapThumbnail"
                      />
                    </v-container>
                  </v-col>
                  <v-col style="width: 766px;" class="mr-5 my-3">
                    <v-card flat>
                      <v-hover v-slot:default="{ hover }" style="cursor: pointer;">
                        <span @click.stop="coverDialog = true">
                          <v-img
                            v-if="projectDetails.coverLink != null"
                            :src="projectDetails.coverLink"
                            height="511"
                          ></v-img>
                          <v-img
                            v-else
                            :src="randomCover"
                            height="511"
                            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                          >
                            <v-overlay :absolute="true">
                              <v-container class="white--text display-3" v-text="title" />
                            </v-overlay>
                          </v-img>
                          <v-overlay :value="hover" absolute opacity="0.75">
                            <v-container class="white--text headline"
                              >Click to change cover image.</v-container
                            >
                          </v-overlay>
                        </span>
                      </v-hover>
                      <MediaUpload
                        v-model="coverDialog"
                        :path="`/projects/${this.$route.params.id}/cover`"
                        title="Cover Image Upload"
                        types="image/jpeg, image/png"
                        :avatar="false"
                        @file="hotswapCoverImage"
                      />
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
              <br />
              <v-card class="mx-auto mb-12">
                <br />
                <h1>Project Board</h1>
                <v-container>
                  <ProjectBoard
                    v-model="projectDetails.boardItems"
                    v-bind:onProject="true"
                    v-bind:createdAt="projectDetails.createdAt"
                  />
                </v-container>
              </v-card>
              <v-btn color="primary" class="mx-1" @click="step = 4">
                <h1>Continue</h1>
              </v-btn>
              <v-btn class="mx-1" @click="step = 4">
                <h1>Skip</h1>
              </v-btn>
            </v-container>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-toolbar dense class="mx-3">
              <v-toolbar-title>
                <v-icon v-if="!loading" color="success">
                  mdi-check
                </v-icon>
                <v-progress-circular v-else color="primary" indeterminate />
                Member Management
              </v-toolbar-title>
            </v-toolbar>
            <v-container>
              <v-card class="mx-auto mb-12">
                <v-container>
                  Click to toggle whether the project is accepting applications:
                  <v-tooltip top max-width="175">
                    <template v-slot:activator="{ on }">
                      <v-btn icon v-on="on" @click="toggleAcceptingApps()">
                        <v-icon
                          v-if="!editAcceptingApps"
                          v-bind:color="projectDetails.acceptingApplications ? 'success' : 'error'"
                        >
                          {{
                            projectDetails.acceptingApplications
                              ? "mdi-sticker-check-outline"
                              : "mdi-sticker-remove-outline"
                          }}
                        </v-icon>
                        <v-progress-circular v-else color="primary" indeterminate />
                      </v-btn>
                    </template>
                    <span v-if="projectDetails.acceptingApplications"
                      >This project is accepting applications.</span
                    >
                    <span v-else>This project is not accepting applications.</span>
                  </v-tooltip>

                  <MemberManagement
                    @update="getProjectData"
                    v-bind:contributors="projectDetails.contributors"
                    v-bind:administrators="projectDetails.administrators"
                  />
                </v-container>
              </v-card>
              <v-btn color="primary" class="mx-1" @click="step = 5">
                <h1>Continue</h1>
              </v-btn>
              <v-btn class="mx-1" @click="step = 5">
                <h1>Skip</h1>
              </v-btn>
            </v-container>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
    <v-hover v-if="step === 5" v-slot:default="{ hover }" class="my-6">
      <v-card
        class="mx-auto"
        width="600"
        @click="$router.push(`/project/${projectDetails.id}`)"
        style="cursor:pointer;"
        :elevation="hover ? 12 : 4"
        :ripple="false"
      >
        <v-img contain max-height="500" :src="require('@/../public/assets/createProject.svg')" />
        <h1><h2>Finish</h2></h1>
        <br />
      </v-card>
    </v-hover>
    <ErrorDialog v-model="created" text="Project Created!" src="createProject.svg" />
  </v-container>
</template>

<script>
import uuid from 'uuid/v4';
import apiCall from '@/apiCall';
import Loading from '@/components/Loading.vue';
import ErrorDialog from '@/components/ErrorDialog.vue';
import ProjectBoard from '@/components/ProjectBoard.vue';
import MediaUpload from '@/components/MediaUpload.vue';
import MemberManagement from '@/components/MemberManagement.vue';

export default {
  components: {
    Loading,
    ErrorDialog,
    ProjectBoard,
    MediaUpload,
    MemberManagement,
  },
  data() {
    return {
      step: 0,
      id: uuid(),
      loading: false,
      thumbnailDialog: false,
      coverDialog: false,
      editAcceptingApps: false,
      titleTimeout: undefined,
      taglineTimeout: undefined,
      bodyTimeout: undefined,
      majorsTimeout: undefined,
      tagsTimeout: undefined,
      projectDetails: {
        id: '',
        title: '',
        tagline: '',
        acceptingApplications: true,
        createdAt: '',
        coverLink: '',
        thumbnailLink: '',
        body: null,
        tags: [],
        requestedMajors: [],
        comments: [],
        boardItems: [],
        contributors: [],
        administrators: [],
      },
      created: false,
      oneCompleted: false,
      twoCompleted: false,
      threeCompleted: false,
      fourCompleted: false,
      rules: {
        length: len => v => (v || '').length <= len || `Invalid character length, must be less than ${len}`,
      },
    };
  },
  methods: {
    removeMajor(item) {
      const index = this.projectDetails.requestedMajors.indexOf(item);
      if (index >= 0) this.projectDetails.requestedMajors.splice(index, 1);
      this.updateMajors();
    },
    removeTag(item) {
      const index = this.projectDetails.tags.indexOf(item);
      if (index >= 0) this.projectDetails.tags.splice(index, 1);
      this.updateTags();
    },
    noCacheImages() {
      this.projectDetails.thumbnailLink = `${
        this.projectDetails.thumbnailLink
      }?noCache=${Math.round(Math.random() * 10000)}`;
      this.projectDetails.coverLink = `${this.projectDetails.coverLink}?noCache=${Math.round(
        Math.random() * 10000,
      )}`;
    },
    hotswapThumbnail(file) {
      this.projectDetails.thumbnailLink = URL.createObjectURL(file);
    },
    hotswapCoverImage(file) {
      this.projectDetails.coverLink = URL.createObjectURL(file);
    },
    async getProjectData() {
      this.loading = true;
      await apiCall.methods
        .get(`/projects/${this.$route.params.id}`, '', this.$route.fullPath)
        .then((response) => {
          if (response.status === 200) {
            this.projectDetails = response.data;
            this.noCacheImages();
          }
        });
      this.loading = false;
    },
    async submitProject() {
      this.loading = true;
      await apiCall.methods
        .post(
          '/projects/',
          '',
          this.projectDetails.body === null || this.projectDetails.body === ''
            ? {
              id: this.id,
              title: this.projectDetails.title,
              tagline: this.projectDetails.tagline,
            }
            : {
              id: this.id,
              title: this.projectDetails.title,
              tagline: this.projectDetails.tagline,
              body: this.projectDetails.body,
            },
          this.$route.fullPath,
        )
        .then((response) => {
          if (response.status === 200) {
            this.$router.push(`/create/${this.id}`);
            this.projectDetails = response.data;
            this.step = 2;
            this.created = true;
            this.oneCompleted = true;
          }
        });
      this.loading = false;
    },
    async updateTitle() {
      this.loading = true;
      if (this.projectDetails.title !== '') {
        clearTimeout(this.titleTimeout);
        this.titleTimeout = setTimeout(() => {
          apiCall.methods
            .patch(
              `/projects/${this.$route.params.id}`,
              '',
              {
                title: this.projectDetails.title,
              },
              this.$route.fullPath,
            )
            .then((response) => {
              if (response.status === 200) {
                this.getProjectData();
              }
            });
        }, 1000);
      }
    },
    async updateTagline() {
      this.loading = true;
      if (this.projectDetails.tagline !== '') {
        clearTimeout(this.taglineTimeout);
        this.taglineTimeout = setTimeout(() => {
          apiCall.methods
            .patch(
              `/projects/${this.$route.params.id}`,
              '',
              {
                tagline: this.projectDetails.tagline,
              },
              this.$route.fullPath,
            )
            .then((response) => {
              if (response.status === 200) {
                this.getProjectData();
              }
            });
        }, 1000);
      }
    },
    async updateDescription() {
      this.loading = true;
      if (this.projectDetails.body !== '') {
        clearTimeout(this.bodyTimeout);
        this.bodyTimeout = setTimeout(() => {
          apiCall.methods
            .patch(
              `/projects/${this.$route.params.id}`,
              '',
              {
                body: this.projectDetails.body,
              },
              this.$route.fullPath,
            )
            .then((response) => {
              if (response.status === 200) {
                this.getProjectData();
              }
            });
        }, 1000);
      }
    },
    async updateMajors() {
      this.loading = true;
      clearTimeout(this.majorsTimeout);
      this.majorsTimeout = setTimeout(() => {
        apiCall.methods
          .put(
            `/projects/${this.$route.params.id}/majors`,
            '',
            this.projectDetails.requestedMajors,
            this.$route.fullPath,
          )
          .then((response) => {
            this.loading = false;
          });
      }, 3000);
    },
    async updateTags() {
      this.loading = true;
      clearTimeout(this.tagsTimeout);
      this.tagsTimeout = setTimeout(() => {
        apiCall.methods
          .put(
            `/projects/${this.$route.params.id}/tags`,
            '',
            this.projectDetails.tags,
            this.$route.fullPath,
          )
          .then((response) => {
            this.loading = false;
          });
      }, 3000);
    },
    async toggleAcceptingApps() {
      this.loading = true;
      this.editAcceptingApps = true;
      await apiCall.methods
        .patch(
          `/projects/${this.$route.params.id}`,
          '',
          {
            acceptingApplications: !this.projectDetails.acceptingApplications,
          },
          this.$route.fullPath,
        )
        .then((response) => {
          if (response.status === 200) {
            this.getProjectData();
          }
        });
      this.editAcceptingApps = false;
    },
  },
  async mounted() {
    if (this.$route.params.id !== undefined) {
      await this.getProjectData();
      this.step = 1;
      this.oneCompleted = true;
    }
  },
  watch: {
    projectDetails() {
      this.twoCompleted = this.projectDetails.requestedMajors.length > 0
        && this.projectDetails.tags.length > 0;
      this.threeCompleted = !this.projectDetails.thumbnailLink.includes('defaults')
        && !this.projectDetails.coverLink.includes('defaults');
      this.fourCompleted = true;
    },
  },
  computed: {
    availableMajors() {
      return this.$store.state.majors;
    },
    availableTags() {
      return this.$store.state.tags;
    },
    randomCover() {
      return `https://picsum.photos/766/350?${this.projectDetails.title}`;
    },
    basicsInvalid() {
      if (this.projectDetails.title === null || this.projectDetails.tagline === null) return true;
      return (
        this.projectDetails.title.length === 0
        || this.projectDetails.title.length > 64
        || this.projectDetails.tagline.length === 0
        || this.projectDetails.tagline.length > 256
        || (this.projectDetails.body !== null && this.projectDetails.body.length > 2048)
      );
    },
  },
};
</script>
