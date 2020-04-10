<template>
  <v-dialog :dark="dark" :value="show" max-width="600" persistent>
    <v-card>
      <h1>
        <v-img contain max-height="500" :src="require(`@/../public/assets/${src}`)" />
        {{ text }}
      </h1>
      <br />
      <v-progress-linear :value="errorDialog" />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    text: String,
    src: String,
    dark: Boolean,
  },
  data() {
    return {
      errorTime: undefined,
      errorDialog: 0,
    };
  },
  methods: {
    showerrorDialog() {
      this.errorTime = new Date();
      this.errorTime.setSeconds(this.errorTime.getSeconds() + 2);
      this.updateerrorDialog();
      const interval = setInterval(() => {
        if (this.errorDialog < 0) {
          clearInterval(interval);
          this.show = false;
        } else this.updateerrorDialog();
      }, 150);
    },
    updateerrorDialog() {
      this.errorDialog = (this.errorTime - new Date()) / 20;
    },
  },
  computed: {
    show: {
      get() {
        if (this.value) this.showerrorDialog();
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
        this.value = false;
      },
    },
  },
};
</script>
