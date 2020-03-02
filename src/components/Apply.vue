<template>
  <v-container>
    <v-btn outlined block @click.stop="dialog = true">
      <h2>Apply</h2>
    </v-btn>

    <v-dialog v-model="dialog" max-width="50%">
      <v-card>
        <v-card-title class="headline">Apply</v-card-title>
        <v-card-text class="text-left">
            Write your application note below.
            You may want to include things such as:
            <ul>
                <li> why you want to be on the project</li>
                <li> what your strengths are</li>
                <li> link to your resume</li>
            </ul>
            <v-textarea
            outlined
            v-model="body"
            name="Note"
            label="Note"
            counter="2048"
            ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
