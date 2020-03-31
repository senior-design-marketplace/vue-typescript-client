<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <h1>My Profile</h1>
        <v-hover v-slot:default="{ hover }" style="cursor:pointer;">
          <v-avatar
            @click.stop="dialog = true"
            size="150"
            :color="thumbnailLink !== null ? undefined : 'primary'"
          >
            <v-img v-if="thumbnailLink !== null" :src="thumbnailLink" />
            <v-icon v-else size="125" dark>mdi-account-circle</v-icon>
            <v-overlay :value="hover" absolute opacity="0.75">
              <v-container class="white--text headline">Click to change avatar.</v-container>
            </v-overlay>
          </v-avatar>
        </v-hover>
        <p />
      </v-col>
      <v-card min-width="875">
        <v-container>
          <v-row class="text-left">
            <v-col cols="12">
              <h5>Name</h5>
              <h2>{{ first }} {{ last }}</h2>
              <br />
              <h5>Username</h5>
              <h2>{{ id }}</h2>
              <br />
              <h5>Email</h5>
              <h2>{{ email }}</h2>
              <br />
              <h5>Role</h5>
              <h2>{{ role }}</h2>
              <br />
              <h2 class="text-left">
                Bio:
                <v-btn
                  :disabled="newBioInvalid"
                  v-if="editBio || bio === null"
                  icon
                  @click="updateBio()"
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn v-if="editBio || bio === null" icon @click="toggleEditBio">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn v-else icon @click="toggleEditBio">
                  <v-icon> mdi-pencil</v-icon>
                </v-btn>
              </h2>
              <v-container v-if="!editBio && bio !== null" class="text-left" v-text="bio" />
              <v-textarea
                v-else
                class="mx-1"
                rows="3"
                counter="256"
                no-resize
                outlined
                :placeholder="bio"
                v-model="newBio"
                :rules="[rules.length(256)]"
              />

              <v-row v-if="this.$route.path == '/debug'" class="mx-10 my-10">
                <v-text-field label="Token" hide-details v-model="token" ref="tokenRef" />
                <v-btn icon @click="copyToken">
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </v-row>
              <v-row v-if="this.$route.path == '/debug'" class="mx-10 my-10">
                <v-text-field
                  label="URLToken"
                  hide-details
                  :value="`#access_token=&id_token=${token}&`"
                  ref="urlTokenRef"
                />
                <v-btn icon @click="copyURLToken">
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </v-row>
              <v-row v-if="this.$route.path == '/debug'" class="mx-10 my-10">
                <v-textarea class="mx-1" rows="1" no-resize v-model="debugRoute" />
                <v-btn @click="otherLogin(debugRoute)"> {{ debugRoute }} Login </v-btn>
                <v-btn
                  @click="
                    otherLogin('http://marqetplace-staging.s3-website-us-east-1.amazonaws.com/')
                  "
                >
                  Staging Login
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
    <PictureUpload
      v-model="dialog"
      :path="`/users/${this.$store.state.userDetails.cognitoUsername}/avatar`"
      title="Avatar Upload"
      :avatar="true"
      @file="hotswapAvatar"
    />
  </v-container>
</template>

<script>
import apiCall from '@/apiCall';
import PictureUpload from '@/components/PictureUpload.vue';

export default {
  components: {
    PictureUpload,
  },
  data() {
    return {
      dialog: false,
      newBio: null,
      editBio: false,
      debugRoute: 'http://localhost:8080/',
      rules: {
        length: len => v => (v || '').length <= len || `Invalid character length, must be less than ${len}`,
      },
    };
  },
  methods: {
    copyToken() {
      const textToCopy = this.$refs.tokenRef.$el.querySelector('input');
      textToCopy.select();
      document.execCommand('copy');
    },
    copyURLToken() {
      const textToCopy = this.$refs.urlTokenRef.$el.querySelector('input');
      textToCopy.select();
      document.execCommand('copy');
    },
    otherLogin(debugRoute) {
      window.location.href = `${debugRoute}#access_token=&id_token=${this.token}&`;
    },
    hotswapAvatar(file) {
      this.$store.state.userDetails.thumbnailLink = URL.createObjectURL(file);
    },
    toggleEditBio() {
      this.editBio = !this.editBio;
      this.newBio = this.bio;
    },
    async updateBio() {
      const response = await apiCall.methods.patch(
        `/users/${this.$store.state.userDetails.cognitoUsername}`,
        '',
        {
          bio: this.newBio,
        },
        this.$route.fullPath,
      );
      if (response.status === 200) {
        this.editBio = false;
        this.$store.commit('updateUserDetail', {
          detail: 'bio',
          value: this.newBio,
        });
      }
    },
  },
  computed: {
    thumbnailLink() {
      return this.$store.state.userDetails.thumbnailLink;
    },
    first() {
      return this.$store.state.userDetails.firstName;
    },
    last() {
      return this.$store.state.userDetails.lastName;
    },
    id() {
      return this.$store.state.userDetails.id;
    },
    email() {
      return this.$store.state.userDetails.email;
    },
    role() {
      return this.$store.state.userDetails.role;
    },
    bio() {
      return this.$store.state.userDetails.bio;
    },
    token() {
      return this.$store.state.userDetails.token;
    },
    newBioInvalid() {
      if (this.newBio === null) return true;
      return this.newBio.length === 0 || this.newBio.length > 256;
    },
  },
};
</script>
