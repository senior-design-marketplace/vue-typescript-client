import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id_token: '',
    savePath: '/',
  },
  mutations: {
    setToken: (state, token) => {
      state.id_token = token;
    },
    resetToken: (state) => {
      state.id_token = '';
    },
    setsavePath: (state, path) => {
      state.savePath = path;
    },
    resetSavePath: (state) => {
      state.savePath = '';
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
        removeItem: key => Cookies.remove(key),
      },
    }),
  ],
});
