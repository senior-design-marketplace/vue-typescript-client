<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <h1>My Profile</h1>
        <v-btn min-height="150" min-width="150" fab x-large dark v-on:click="shown = 'Gregg'">
          <v-avatar size="150">
            <img :src="require('@/../public/assets/Gregg.png')" height="150px" />
          </v-avatar>
        </v-btn>
        <p />
        <v-btn outlined block>
          <h2>Upload Photo</h2>
        </v-btn>
        <h5>Max file size XX</h5>
      </v-col>
      <v-card min-width="875">
        <v-container>
          <v-row class="text-left">
            <v-col cols="12">
              <h5>Name</h5>
              <h2>{{first}} {{last}}</h2>
              <br />
              <h5>Username</h5>
              <h2>{{userId}}</h2>
              <br />
              <h5>Email</h5>
              <h2>{{email}}</h2>
              <br />
              <h5>Major</h5>
              <h2>Major Here</h2>
              <br />
              <h5>Role</h5>
              <h2>{{role}}</h2>
              <br />
              <v-textarea outlined name="Bio" label="Bio" counter="2048"></v-textarea>
              <v-col cols="12" sm="3">
                <v-btn outlined block>
                  <h2>Submit Bio</h2>
                </v-btn>
              </v-col>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import store from '@/store';

export default {
  computed: {
    first() {
      return store.state.firstName;
    },
    last() {
      return store.state.lastName;
    },
    userId() {
      return store.state.userId;
    },
    email() {
      return store.state.email;
    },
    role() {
      return store.state.role;
    },
  },
};
</script>
