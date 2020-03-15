<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-btn class="text-right" icon @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container class="headline" v-text="body" />
        <v-container class="title">
          To confirm, type "<b>{{ stringToType }}</b>" below.
        <v-text-field v-model="input" :placeholder="stringToType" :disabled="correct" />
        </v-container>
        <v-btn :disabled="!correct" color="success" @click="$emit('confirm', true)">
          <h2>Confirm</h2>
        </v-btn>
        <v-btn color="error" @click="show = false">
          <h2>Cancel</h2>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    title: String,
    body: String,
    stringToType: String,
  },
  data() {
    return {
      input: null,
    };
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
    correct() {
      if (this.input === null) return false;
      return this.stringToType.toLowerCase() === this.input.toLowerCase();
    },
  },
  watch: {
    value() {
      if (!this.value) {
        this.input = null;
      }
    },
  },
};
</script>
