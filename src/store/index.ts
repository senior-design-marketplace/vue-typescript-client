import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id_token: '',
  },
  mutations: {
    setToken: (state, n) => {
      state.id_token = n;
    },
    resetToken: (state) => {
      state.id_token = '';
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
