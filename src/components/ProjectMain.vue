<template>
  <div>
    <v-toolbar>
      <v-tooltip v-if="onProject" top max-width="175">
        <template v-slot:activator="{ on }">
          <v-avatar
            v-on="on"
            @click.stop="thumbnailDialog = true"
            size="50"
            :color="avatar !== null ? undefined : 'primary'"
            style="cursor:pointer;"
          >
            <v-img v-if="avatar != null" :src="avatar" max-height="50" max-width="50" />
            <span
              v-else-if="title != null"
              class="white--text headline"
              v-text="title.substring(0, 1).toLowerCase()"
            />
          </v-avatar>
        </template>
        <span>Click to change avatar</span>
      </v-tooltip>
      <v-avatar v-else size="50" :color="avatar !== null ? undefined : 'primary'">
        <v-img v-if="avatar !== null" :src="avatar" max-height="50" max-width="50" />
        <span
          v-else-if="title != null"
          class="white--text headline"
          v-text="title.substring(0, 1).toLowerCase()"
        />
      </v-avatar>
      <h2 v-if="!editTitle" class="text-left mx-1">{{ title }}</h2>
      <v-textarea
        v-else
        class="mx-1"
        rows="1"
        counter="64"
        no-resize
        :placeholder="title"
        v-model="newTitle"
        :rules="[rules.length(64)]"
      />
      <v-btn :disabled="newTitleInvalid" v-if="editTitle" icon @click="updateTitle()">
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn v-if="editTitle" icon @click="editTitle = false">
        <v-icon color="gray">mdi-close</v-icon>
      </v-btn>
      <v-btn-toggle v-else-if="onProject" borderless rounded v-model="editTitle">
        <v-btn icon :value="true">
          <v-icon color="gray">mdi-pencil</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-item-group>
        <v-list-item>
          <v-item v-slot:default="{ active, toggle }">
            <v-btn icon @click="toggle">
              <v-icon v-bind:color="active ? 'yellow accent-4' : 'gray'">mdi-star</v-icon>
            </v-btn>
          </v-item>
        </v-list-item>
      </v-item-group>
      <v-tooltip top max-width="175">
        <template v-slot:activator="{ on }">
          <v-btn v-if="onProject" icon v-on="on" @click="toggleAcceptingApps()">
            <v-icon v-if="!editAcceptingApps" v-bind:color="acceptingApps ? 'success' : 'gray'">
              mdi-sticker-check-outline
            </v-icon>
            <v-progress-circular v-else indeterminate />
          </v-btn>
          <span v-else icon v-on="on">
            <v-icon v-if="!editAcceptingApps" v-bind:color="acceptingApps ? 'success' : 'gray'">
              mdi-sticker-check-outline
            </v-icon>
            <v-progress-circular v-else indeterminate />
          </span>
        </template>
        <span v-if="acceptingApps">{{ title }} is accepting applications.</span>
        <span v-else>{{ title }} is not accepting applications.</span>
      </v-tooltip>
    </v-toolbar>
    <p />
    <v-card>
      <v-hover v-if="onProject" v-slot:default="{ hover }" style="cursor:pointer;">
        <span @click.stop="coverDialog = true" size="150" color="primary">
          <v-img v-if="coverImg != null" :src="coverImg" height="350"></v-img>
          <v-img
            v-else
            :src="randomCover"
            height="350"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          >
            <v-overlay :absolute="true">
              <v-container class="white--text display-3" v-text="title" />
            </v-overlay>
          </v-img>
          <v-overlay :value="hover" absolute opacity="0.75">
            <v-container class="white--text headline">Click to change cover image.</v-container>
          </v-overlay>
        </span>
      </v-hover>
      <span v-else size="150" color="primary">
        <v-img v-if="coverImg != null" :src="coverImg" height="350"></v-img>
        <v-img
          v-else
          :src="randomCover"
          height="350"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        >
          <v-overlay :absolute="true">
            <v-container class="white--text display-3" v-text="title" />
          </v-overlay>
        </v-img>
      </span>
    </v-card>
    <p />
    <v-card>
      <v-container>
        <h2 class="text-left">
          Tagline:
          <v-btn :disabled="newTaglineInvalid" v-if="editTagline" icon @click="updateTagline()">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn v-if="editTagline" icon @click="editTagline = false">
            <v-icon color="gray">mdi-close</v-icon>
          </v-btn>
          <v-btn-toggle v-else-if="onProject" borderless rounded v-model="editTagline">
            <v-btn icon :value="true">
              <v-icon color="gray">mdi-pencil</v-icon>
            </v-btn>
          </v-btn-toggle>
        </h2>
        <v-container v-if="!editTagline" class="text-left" v-text="tagline" />
        <v-textarea
          v-else
          class="mx-1"
          rows="3"
          counter="256"
          no-resize
          outlined
          :placeholder="tagline"
          v-model="newTagline"
          :rules="[rules.length(256)]"
        />
        <h2 class="text-left">
          Description:
          <v-btn
            :disabled="newDescriptionInvalid"
            v-if="editDescription"
            icon
            @click="updateDescription()"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn v-if="editDescription" icon @click="editDescription = false">
            <v-icon color="gray">mdi-close</v-icon>
          </v-btn>
          <v-btn-toggle v-else-if="onProject" borderless rounded v-model="editDescription">
            <v-btn icon :value="true">
              <v-icon color="gray">mdi-pencil</v-icon>
            </v-btn>
          </v-btn-toggle>
        </h2>
        <v-container v-if="!editDescription" class="text-left" v-text="description" />
        <v-textarea
          v-else
          class="mx-1"
          rows="15"
          counter="2048"
          no-resize
          outlined
          :placeholder="description"
          v-model="newDescription"
          :rules="[rules.length(2048)]"
        />
        <h2 class="text-left">Majors:</h2>
        <v-chip-group column>
          <v-chip label v-for="major in majors" :key="major" class="noClick">{{ major }}</v-chip>
        </v-chip-group>
        <br />
        <h2 class="text-left">Tags:</h2>
        <v-chip-group column>
          <v-chip label v-for="tag in tags" :key="tag" class="noClick">{{ tag }}</v-chip>
        </v-chip-group>
      </v-container>
    </v-card>
    <PictureUpload
      v-model="thumbnailDialog"
      :path="`/projects/${this.$route.params.id}/thumbnail`"
      :avatar="true"
    />
    <PictureUpload
      v-model="coverDialog"
      :path="`/projects/${this.$route.params.id}/cover`"
      :avatar="false"
    />
  </div>
</template>

<script>
import apiCall from '@/apiCall';
import PictureUpload from '@/components/PictureUpload.vue';

export default {
  components: {
    PictureUpload,
  },
  props: {
    avatar: String,
    title: String,
    starred: Boolean,
    coverImg: String,
    tagline: String,
    description: String,
    majors: Array,
    tags: Array,
    acceptingApps: Boolean,
    onProject: Boolean,
    isAdmin: Boolean,
  },
  data: () => ({
    thumbnailDialog: false,
    coverDialog: false,
    editTitle: false,
    newTitle: '',
    editTagline: false,
    newTagline: '',
    editDescription: false,
    newDescription: '',
    editAcceptingApps: false,
    rules: {
      length: len => v => (v || '').length <= len || `Invalid character length, must be less than ${len}`,
    },
  }),
  methods: {
    async updateTitle() {
      const response = await apiCall.methods.patch(
        `/projects/${this.$route.params.id}`,
        '',
        {
          title: this.newTitle,
        },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.editTitle = false;
        this.title = this.newTitle;
      }
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
    async toggleAcceptingApps() {
      this.editAcceptingApps = true;
      const response = await apiCall.methods.patch(
        `/projects/${this.$route.params.id}`,
        '',
        {
          acceptingApplications: !this.acceptingApps,
        },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.acceptingApps = !this.acceptingApps;
        this.editAcceptingApps = false;
      }
    },
  },
  watch: {
    editTitle() {
      this.newTitle = this.title;
    },
    editTagline() {
      this.newTagline = this.tagline;
    },
    editDescription() {
      this.newDescription = this.description;
    },
  },
  computed: {
    randomCover() {
      return `https://picsum.photos/766/350?${this.title}`;
    },
    newTitleInvalid() {
      return this.newTitle.length === 0 || this.newTitle.length > 64;
    },
    newTaglineInvalid() {
      return this.newTagline.length === 0 || this.newTitle.newTagline > 256;
    },
    newDescriptionInvalid() {
      return this.newDescription.length === 0 || this.newDescription.length > 2048;
    },
  },
};
</script>

<style>
.noClick {
  pointer-events: none;
}
</style>
