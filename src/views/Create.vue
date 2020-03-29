<template>
  <v-container>
    <h1>Create Project</h1>
    <br />
    <v-hover v-if="step === 0" v-slot:default="{ hover }">
      <v-card
        class="mx-auto"
        width="600"
        @click="step = 1"
        style="cursor:pointer;"
        :elevation="hover ? 12 : 4"
        :ripple="false"
      >
        <h1>
          <v-img contain max-height="500" :src="require('@/../public/assets/createProject.svg')" />
          <v-btn color="primary" outlined>
            <h1>Get Started</h1>
          </v-btn>
        </h1>
        <br />
      </v-card>
    </v-hover>
    <v-card v-else class="mx-auto" width="1500">
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1" edit-icon="mdi-check">
            Basics
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 2" step="2" :editable="step > 1" edit-icon="mdi-check">
            Tags & Majors
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 3" step="3" :editable="step > 1" edit-icon="mdi-check">
            Media
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 4" step="4" :editable="step > 1" edit-icon="mdi-check">
            Members
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="mx-auto mb-12" max-width="1000px">
              <v-container>
                <v-textarea
                  class="mx-1"
                  rows="1"
                  counter="64"
                  outlined
                  label="Title"
                  v-model="title"
                  :rules="[rules.length(64)]"
                />
                <v-textarea
                  class="mx-1"
                  rows="3"
                  counter="256"
                  outlined
                  label="Tagline"
                  v-model="tagline"
                  :rules="[rules.length(256)]"
                />
                <v-textarea
                  class="mx-1"
                  rows="15"
                  counter="2048"
                  outlined
                  label="Description"
                  v-model="body"
                  :rules="[rules.length(2048)]"
                />
              </v-container>
            </v-card>
            <v-btn color="primary" :disabled="basicsInvalid" @click="submitProject">
              <h1>Create & Continue</h1>
            </v-btn>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card class="mx-auto mb-12">
              <h1>
                Not implemented yet.
              </h1>
            </v-card>
            <v-btn color="primary" class="mx-1" @click="step = 3">
              <h1>Continue</h1>
            </v-btn>
            <v-btn class="mx-1" @click="step = 3">
              <h1>Skip</h1>
            </v-btn>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card class="mx-auto mb-12">
              <h1>
                Not implemented yet.
              </h1>
            </v-card>
            <v-btn color="primary" class="mx-1" @click="step = 4">
              <h1>Continue</h1>
            </v-btn>
            <v-btn class="mx-1" @click="step = 4">
              <h1>Skip</h1>
            </v-btn>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-card class="mx-auto mb-12">
              <h1>
                Not implemented yet.
              </h1>
            </v-card>
            <v-btn color="primary" class="mx-1" @click="step = 5">
              <h1>Continue</h1>
            </v-btn>
            <v-btn class="mx-1" @click="step = 5">
              <h1>Skip</h1>
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
    <v-hover v-if="step === 5" v-slot:default="{ hover }" class="my-6">
      <v-card
        class="mx-auto"
        width="600"
        @click="$router.push(`/project/${id}`)"
        style="cursor:pointer;"
        :elevation="hover ? 12 : 4"
        :ripple="false"
      >
        <h1>
          <v-img contain max-height="500" :src="require('@/../public/assets/createProject.svg')" />
          <v-btn color="primary" outlined>
            <h1>Finish</h1>
          </v-btn>
        </h1>
        <br />
      </v-card>
    </v-hover>
    <ErrorDialog v-model="created" text="Project Created!" src="createProject.svg" />
  </v-container>
</template>

<script>
import uuid from 'uuid/v4';
import apiCall from '@/apiCall';
import ErrorDialog from '@/components/ErrorDialog.vue';

export default {
  components: {
    ErrorDialog,
  },
  data() {
    return {
      id: uuid(),
      step: 0,
      projectDetails: undefined,
      title: null,
      tagline: null,
      body: null,
      created: false,
      rules: {
        length: len => v => (v || '').length <= len || `Invalid character length, must be less than ${len}`,
      },
    };
  },
  methods: {
    async submitProject() {
      await apiCall.methods
        .post(
          '/projects/',
          '',
          this.body === null || this.body === ''
            ? {
              id: this.id,
              title: this.title,
              tagline: this.tagline,
            }
            : {
              id: this.id,
              title: this.title,
              tagline: this.tagline,
              body: this.body,
            },
          this.$route.fullPath,
        )
        .then((response) => {
          if (response.status === 200) {
            this.getProjectData();
            this.projectDetails = response.data;
            this.step = 2;
            this.created = true;
          }
        });
    },
    async getProjectData() {
      await apiCall.methods.get(`/projects/${this.id}`, '', this.$route.fullPath).then((response) => {
        if (response.status === 200) {
          this.projectDetails = response.data;
        }
      });
    },
  },
  computed: {
    basicsInvalid() {
      if (this.title === null || this.tagline === null) return true;
      return (
        this.title.length === 0
        || this.title.length > 64
        || this.tagline.length === 0
        || this.tagline.length > 256
        || (this.body !== null && this.body.length > 2048)
      );
    },
  },
};
</script>
