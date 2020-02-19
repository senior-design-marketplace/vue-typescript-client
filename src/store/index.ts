import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id_token: '',
    savePath: '/',
    order: 'descending',
    sort: 'new',
    view: '0',
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

    setOrder: (state, order) => {
      state.order = order;
    },
    setSort: (state, sort) => {
      state.sort = sort;
    },
    setView: (state, view) => {
      state.view = view;
    },
  },
  getters: {
    isLoggedIn: state => state.id_token.length !== 0,
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 1 }),
        removeItem: key => Cookies.remove(key),
      },
    }),
  ],
});
