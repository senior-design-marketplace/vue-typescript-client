<template>
  <div>
    <v-toolbar>
      <v-tooltip v-if="onProject" top>
        <template v-slot:activator="{ on }">
          <v-avatar
            v-on="on"
            @click.stop="thumbnailDialog = true"
            size="50"
            :color="avatar !== null ? undefined : 'primary'"
            class="mx-1"
            style="cursor: pointer;"
          >
            <v-img v-if="avatar != null" :src="avatar" max-height="50" max-width="50" />
            <span
              v-else-if="title != null"
              class="white--text headline"
              v-text="title.substring(0, 1).toLowerCase()"
            />
          </v-avatar>
        </template>
        <span>Click to change avatar.</span>
      </v-tooltip>
      <v-avatar v-else size="50" class="mx-1" :color="avatar !== null ? undefined : 'primary'">
        <v-img v-if="avatar !== null" :src="avatar" max-height="50" max-width="50" />
        <span
          v-else-if="title != null"
          class="white--text headline"
          v-text="title.substring(0, 1).toLowerCase()"
        />
      </v-avatar>
      <v-container v-if="!editTitle" class="headline text-left text-break mx-1">
        {{ title }}
      </v-container>
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
      <v-btn v-if="editTitle" icon @click="toggleEditTitle">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-tooltip v-else-if="onProject" top max-width="175">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon @click="toggleEditTitle">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Edit title</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-btn v-if="isAdmin" icon @click="$emit('adminPanel')">
        <v-icon>
          mdi-cog
        </v-icon>
      </v-btn>
      <v-btn icon @click="toggleStarred">
        <v-icon :color="starred ? 'yellow accent-4' : 'grey'">mdi-star</v-icon>
      </v-btn>
      <v-tooltip top max-width="175">
        <template v-slot:activator="{ on }">
          <span icon v-on="on">
            <v-icon
              v-if="!editAcceptingApps"
              class="mx-2"
              v-bind:color="acceptingApps ? 'success' : 'error'"
            >
              {{ acceptingApps ? "mdi-sticker-check-outline" : "mdi-sticker-remove-outline" }}
            </v-icon>
            <v-progress-circular v-else color="primary" indeterminate />
          </span>
        </template>
        <span v-if="acceptingApps">This project is accepting applications.</span>
        <span v-else>This project is not accepting applications.</span>
      </v-tooltip>
    </v-toolbar>
    <p />
    <v-card>
      <v-hover v-if="onProject" v-slot:default="{ hover }" style="cursor: pointer;">
        <span @click.stop="coverDialog = true" size="150" color="primary">
          <v-img v-if="coverImg != null" :src="coverImg" height="511"></v-img>
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
            <v-container class="white--text headline">Click to change cover image.</v-container>
          </v-overlay>
        </span>
      </v-hover>
      <span v-else size="150" color="primary">
        <v-img v-if="coverImg != null" :src="coverImg" height="511"></v-img>
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
      </span>
    </v-card>
    <MediaUpload
      v-model="thumbnailDialog"
      :path="`/projects/${this.$route.params.id}/thumbnail`"
      title="Thumbnail Upload"
      types="image/jpeg, image/png"
      :avatar="true"
      @file="hotswapThumbnail"
    />
    <MediaUpload
      v-model="coverDialog"
      :path="`/projects/${this.$route.params.id}/cover`"
      title="Cover Image Upload"
      types="image/jpeg, image/png"
      :avatar="false"
      @file="hotswapCoverImage"
    />
  </div>
</template>

<script>
import apiCall from '@/apiCall';
import MediaUpload from '@/components/MediaUpload.vue';

export default {
  components: {
    MediaUpload,
  },
  props: {
    avatar: String,
    title: String,
    coverImg: String,
    acceptingApps: Boolean,
    onProject: Boolean,
    isAdmin: Boolean,
    starred: Boolean,
    history: Array,
  },
  data: () => ({
    thumbnailDialog: false,
    coverDialog: false,
    editTitle: false,
    newTitle: '',
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
    async toggleStarred() {
      if (!this.starred) {
        const response = await apiCall.methods.post(
          `/users/${this.$store.state.userDetails.cognitoUsername}/stars/${this.$route.params.id}`,
          '',
          {},
          this.$route.fullPath,
        );
        if (response.status === 200) {
          this.$store.state.userDetails.starred.push({ id: this.$route.params.id });
        }
      } else {
        const response = await apiCall.methods.delete(
          `/users/${this.$store.state.userDetails.cognitoUsername}/stars/${this.$route.params.id}`,
          '',
          {},
          this.$route.fullPath,
        );
        if (response.status === 200) {
          const index = this.$store.state.userDetails.starred
            .map(a => a.id)
            .indexOf(this.$route.params.id);
          this.$store.state.userDetails.starred.splice(index, 1);
        }
      }
    },
    toggleEditTitle() {
      this.editTitle = !this.editTitle;
      this.newTitle = this.title;
    },
    hotswapThumbnail(file) {
      this.avatar = URL.createObjectURL(file);
    },
    hotswapCoverImage(file) {
      this.coverImg = URL.createObjectURL(file);
    },
  },
  computed: {
    randomCover() {
      return `https://picsum.photos/766/350?${this.title}`;
    },
    newTitleInvalid() {
      if (this.newTitle === null) return true;
      return this.newTitle.length === 0 || this.newTitle.length > 64;
    },
  },
};
</script>
