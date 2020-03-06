<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <h1>My Profile</h1>
        <v-avatar size="150" color="primary">
          <v-img v-if="thumbnailLink !== null" :src="thumbnailLink" />
          <v-icon v-else size="125" dark>mdi-account-circle</v-icon>
        </v-avatar>
        <p />
        <v-btn outlined block>
          <h2>Upload Photo</h2>
        </v-btn>
        <h5>Max file size 20Mb</h5>
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
              <h5>Major</h5>
              <h2>Major Here</h2>
              <br />
              <h5>Role</h5>
              <h2>{{ role }}</h2>
              <br />
              <v-textarea outlined name="Bio" label="Bio" counter="2048"></v-textarea>
              <v-col cols="12" sm="3">
                <v-btn outlined block>
                  <h2>Submit Bio</h2>
                </v-btn>
              </v-col>

              <v-row v-if="this.$route.path == '/debug'" class="mx-10 my-10">
                <v-text-field label="Token" hide-details v-model="token" ref="tokenRef" />
                <v-btn icon @click="copyToken">
                  <v-icon>
                    mdi-content-copy
                  </v-icon>
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
                  <v-icon>
                    mdi-content-copy
                  </v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
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
    token() {
      return this.$store.state.userDetails.token;
    },
  },
};
</script>
