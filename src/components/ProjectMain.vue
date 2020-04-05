<template>
  <div>
    <v-card>
      <v-container>
        <span style="float: right;" class="text-left">
          <v-btn :disabled="newTaglineInvalid" v-if="editTagline" icon @click="updateTagline()">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn v-if="editTagline" icon @click="toggleEditTagline">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn v-else-if="onProject" icon @click="toggleEditTagline">
            <v-icon> mdi-pencil</v-icon>
          </v-btn>
        </span>
        <v-container
          v-if="!editTagline"
          style="max-width: 900px; white-space: pre-line;"
          class="blockquote"
          v-text="tagline"
        />
        <v-container v-else style="max-width: 900px;">
          <v-textarea
            class="mx-1"
            label="Tagline"
            counter="256"
            no-resize
            auto-grow
            outlined
            :placeholder="tagline"
            v-model="newTagline"
            :rules="[rules.length(256)]"
          />
        </v-container>
        <span style="float: right;" class="text-left">
          <v-btn
            :disabled="newDescriptionInvalid"
            v-if="editDescription"
            icon
            @click="updateDescription()"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn v-if="editDescription" icon @click="toggleEditDescription">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn v-else-if="onProject" icon @click="toggleEditDescription">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </span>
        <v-container
          v-if="!editDescription"
          style="max-width: 900px; white-space: pre-line;"
          class="text-left"
          v-text="description"
        />
        <v-container v-else style="max-width: 900px;">
          <v-textarea
            class="mx-1"
            label="Description"
            counter="2048"
            no-resize
            auto-grow
            outlined
            :placeholder="description"
            v-model="newDescription"
            :rules="[rules.length(2048)]"
          />
        </v-container>
        <v-container style="max-width: 900px;">
          <v-chip-group column>
            <v-tooltip top max-width="175" v-for="major in majors" :key="major">
              <template v-slot:activator="{ on }">
                <v-chip v-on="on" label color="secondary" @click="searchBy('major', major)">
                  {{ major }}
                </v-chip>
              </template>
              <span>This project is requesting {{ major }} majors.</span>
            </v-tooltip>
          </v-chip-group>
          <v-chip-group column>
            <v-tooltip bottom max-width="175" v-for="tag in tags" :key="tag">
              <template v-slot:activator="{ on }">
                <v-chip v-on="on" label color="primary" @click="searchBy('tag', tag)">
                  {{ tag }}
                </v-chip>
              </template>
              <span>This project is tagged with {{ tag }}.</span>
            </v-tooltip>
          </v-chip-group>
        </v-container>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import apiCall from '@/apiCall';

export default {
  props: {
    tagline: String,
    description: String,
    majors: Array,
    tags: Array,
    onProject: Boolean,
  },
  data: () => ({
    editTagline: false,
    newTagline: '',
    editDescription: false,
    newDescription: '',
    rules: {
      length: len => v => (v || '').length <= len || `Invalid character length, must be less than ${len}`,
    },
  }),
  methods: {
    async updateTagline() {
      const response = await apiCall.methods.patch(
        `/projects/${this.$route.params.id}`,
        '',
        {
          tagline: this.newTagline,
        },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.editTagline = false;
        this.tagline = this.newTagline;
      }
    },
    async updateDescription() {
      const response = await apiCall.methods.patch(
        `/projects/${this.$route.params.id}`,
        '',
        {
          body: this.newDescription,
        },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.editDescription = false;
        this.description = this.newDescription;
      }
    },
    toggleEditTagline() {
      this.editTagline = !this.editTagline;
      this.newTagline = this.tagline;
    },
    toggleEditDescription() {
      this.editDescription = !this.editDescription;
      this.newDescription = this.description;
    },
    searchBy(type, newValue) {
      this.$store.commit('resetFilters');
      this.$store.commit('updateFilter', { filter: type, value: newValue });
      this.$router.push('/');
    },
  },
  computed: {
    newTaglineInvalid() {
      if (this.newTagline === null) return true;
      return this.newTagline.length === 0 || this.newTagline.length > 256;
    },
    newDescriptionInvalid() {
      if (this.newDescription === null) return true;
      return this.newDescription.length === 0 || this.newDescription.length > 2048;
    },
  },
};
</script>
