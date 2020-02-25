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
        <v-btn :disabled="dialog" :loading="dialog" outlined block @click="submitProject()">
          <h2>Upload Photo</h2>
        </v-btn>
        <h5>Max file size 20Mb</h5>
      </v-col>
        <v-card min-width="875">
          <v-container>
            <v-row class="text-left">
              <v-col cols="12">
                  <h5>Username</h5>
                  <h2>FLastName</h2>
                  <br />
                  <h5>Name</h5>
                  <h2>FirstName LastName</h2>
                  <br />
                  <h5>Major</h5>
                  <h2>Software Engineer</h2>
                  <br />
                  <h5>Email</h5>
                  <h2>FirstNameLastname@stevens.edu</h2>
                  <br />
                  <v-textarea
                    outlined
                    v-model="body"
                    name="Bio"
                    label="Bio"
                    counter="2048"
                  ></v-textarea>
                  <v-col cols="12" sm="3">
                  <br />
                  <h5>Resume</h5>
                  <v-btn :disabled="dialog" :loading="dialog" outlined block
                  @click="submitProject()">
                    <h2>Upload</h2>
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
export default {
  data() {
    return {
      shown: '',
    };
  },
};
</script>
