import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#0297dc',
        secondary: '#012233',
      },
      dark: {
        primary: '#0297dc',
        secondary: '#012233',
      },
    },
  },
});
