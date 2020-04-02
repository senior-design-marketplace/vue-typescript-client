<template>
  <v-dialog :persistent="loading" v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-btn v-if="!loading" class="text-right" icon @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-progress-circular v-if="loading" indeterminate color="primary" />
      </v-card-title>
      <v-card-text>
        <v-container v-if="this.file !== undefined && type === 'image'">
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
          :accept="types"
          prepend-icon="mdi-camera"
          :rules="[rules.size]"
          :disabled="loading"
        />
        <v-btn
          :disabled="this.file === undefined || loading"
          outlined
          color="primary"
          @click="submitFile"
        >
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
    types: String,
    path: undefined,
    title: undefined,
    avatar: Boolean,
  },
  data() {
    return {
      file: undefined,
      loading: false,
      rules: {
        size: value => !value
          || (value.size !== undefined && value.size < 20000000)
          || 'Media size should be less than 20 MB!',
      },
    };
  },
  methods: {
    async submitFile() {
      this.loading = true;
      const regex = /\/(.*)/gm;
      const response = await apiCall.methods.mediaUpload(
        this.path,
        regex.exec(this.file.type)[1].toUpperCase(),
        this.file,
        this.$route.fullPath,
      );
      if (response.status === 204) {
        this.show = false;
        this.$emit('file', this.file);
      }
      this.loading = false;
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
    type() {
      const regex = /(.*)\//gm;
      return regex.exec(this.file.type)[1];
    },
  },
};
</script>
