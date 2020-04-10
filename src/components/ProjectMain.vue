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
          <v-tooltip v-else-if="onProject" top max-width="175">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click="toggleEditTagline">
                <v-icon> mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit tagline</span>
          </v-tooltip>
        </span>
        <v-container
          v-if="!editTagline"
          style="max-width: 900px; white-space: pre-line;"
          class="blockquote"
          v-text="tagline"
        />
        <v-container v-else style="max-width: 900px;">
          <v-textarea
            label="Tagline"
            counter="256"
            :rows="1"
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
            v-if="editDescription || (description === null && onProject)"
            icon
            @click="updateDescription()"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn v-if="editDescription" icon @click="toggleEditDescription">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-tooltip v-else-if="onProject && description !== null" top max-width="175">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click="toggleEditDescription">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit description</span>
          </v-tooltip>
        </span>
        <v-container
          v-if="!editDescription && description !== null"
          style="max-width: 900px; white-space: pre-line;"
          class="text-left"
          v-text="description"
        />
        <v-container v-else-if="onProject" style="max-width: 900px;">
          <v-textarea
            label="Description"
            counter="2048"
            :rows="1"
            no-resize
            auto-grow
            outlined
            :placeholder="description"
            v-model="newDescription"
            :rules="[rules.length(2048)]"
          />
        </v-container>

        <span v-if="onProject" style="float: right;" class="text-left">
          <v-btn
            v-if="editMajors || majors.length === 0"
            icon
            @click="updateMajors()"
            :disabled="majors.length === 0 && newMajors.length === 0"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn v-if="editMajors" icon @click="toggleEditMajors">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-tooltip v-else-if="onProject && majors.length !== 0" top max-width="175">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click="toggleEditMajors">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit majors</span>
          </v-tooltip>
        </span>
        <v-container style="max-width: 900px;" v-if="onProject || majors.length > 0">
          <v-chip-group column v-if="!editMajors && majors.length !== 0">
            <v-tooltip top max-width="175" v-for="major in majors" :key="major">
              <template v-slot:activator="{ on }">
                <v-chip v-on="on" label color="secondary" @click="searchBy('major', major)">
                  {{ major }}
                </v-chip>
              </template>
              <span>This project is requesting {{ major }} majors.</span>
            </v-tooltip>
          </v-chip-group>
          <v-autocomplete
            v-else-if="onProject"
            v-model="newMajors"
            :items="availableMajors"
            outlined
            chips
            clearable
            label="Majors"
            multiple
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
        </v-container>

        <span v-if="onProject" style="float: right;" class="text-left">
          <v-btn
            v-if="editTags || tags.length === 0"
            icon
            @click="updateTags()"
            :disabled="tags.length === 0 && newTags.length === 0"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn v-if="editTags" icon @click="toggleEditTags">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-tooltip v-else-if="onProject && tags.length !== 0" top max-width="175">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click="toggleEditTags">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit tags</span>
          </v-tooltip>
        </span>
        <v-container style="max-width: 900px;" v-if="onProject || tags.length > 0">
          <v-chip-group column v-if="!editTags && tags.length !== 0">
            <v-tooltip bottom max-width="175" v-for="tag in tags" :key="tag">
              <template v-slot:activator="{ on }">
                <v-chip v-on="on" label color="primary" @click="searchBy('tag', tag)">
                  {{ tag }}
                </v-chip>
              </template>
              <span>This project is tagged with {{ tag }}.</span>
            </v-tooltip>
          </v-chip-group>
          <v-autocomplete
            v-else-if="onProject"
            v-model="newTags"
            :items="availableTags"
            outlined
            chips
            clearable
            label="Tags"
            multiple
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
    editMajors: false,
    newMajors: [],
    editTags: false,
    newTags: [],
    rules: {
      length: len => v => (v || '').length <= len || `Invalid character length, must be less than ${len}`,
    },
  }),
  methods: {
    toggleEditTagline() {
      this.editTagline = !this.editTagline;
      this.newTagline = this.tagline;
    },
    toggleEditDescription() {
      this.editDescription = !this.editDescription;
      this.newDescription = this.description;
    },
    toggleEditMajors() {
      this.editMajors = !this.editMajors;
      this.newMajors = this.majors;
    },
    toggleEditTags() {
      this.editTags = !this.editTags;
      this.newTags = this.tags;
    },
    searchBy(type, newValue) {
      this.$store.commit('resetFilters');
      this.$store.commit('updateFilter', { filter: type, value: newValue });
      this.$router.push('/');
    },
    removeMajor(item) {
      const index = this.newMajors.indexOf(item);
      if (index >= 0) this.newMajors.splice(index, 1);
    },
    removeTag(item) {
      const index = this.newTags.indexOf(item);
      if (index >= 0) this.newTags.splice(index, 1);
    },
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
        this.$emit('update');
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
        this.$emit('update');
      }
    },
    async updateMajors() {
      const response = await apiCall.methods.put(
        `/projects/${this.$route.params.id}/majors`,
        '',
        this.newMajors,
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.editMajors = false;
        this.$emit('update');
      }
    },
    async updateTags() {
      const response = await apiCall.methods.put(
        `/projects/${this.$route.params.id}/tags`,
        '',
        this.newTags,
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.editTags = false;
        this.$emit('update');
      }
    },
  },
  computed: {
    availableMajors() {
      return this.$store.state.majors;
    },
    availableTags() {
      return this.$store.state.tags;
    },
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
