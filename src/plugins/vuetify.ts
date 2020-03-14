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
        primary: '#03A9F5',
        secondary: '#012233',
      },
      dark: {
        primary: '#03A9F5',
        secondary: '#012233',
      },
    },
  },
});
