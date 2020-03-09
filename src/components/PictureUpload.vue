<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        Media Upload
        <v-spacer></v-spacer>
        <v-btn class="text-right" icon @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container v-if="this.file !== undefined">
          <h2>Preview</h2>
          <br />
          <v-avatar v-if="avatar" size="150">
            <v-img :src="image" />
          </v-avatar>
          <v-img v-else :src="image" />
        </v-container>
        <v-file-input
          v-model="file"
          outlined
          dense
          show-size
          accept="image/jpeg, image/png"
          prepend-icon="mdi-camera"
        />
        <v-btn :disabled="this.file === undefined" outlined color="primary" @click="submitFile">
          <h2>Submit</h2>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import apiCall from '@/apiCall';

export default {
  props: {
    value: Boolean,
    path: undefined,
    avatar: Boolean,
  },
  data() {
    return {
      file: undefined,
    };
  },
  methods: {
    async submitFile() {
      const regex = /\/(.*)/gm;
      const response = await apiCall.methods.mediaUpload(
        this.path,
        regex.exec(this.file.type)[1].toUpperCase(),
        this.file,
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.show = false;
      }
    },
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    image() {
      if (this.file !== undefined) return URL.createObjectURL(this.file);
      return '';
    },
  },
};
</script>
