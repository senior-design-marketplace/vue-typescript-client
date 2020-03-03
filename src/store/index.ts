import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id_token: '',
    savePath: '/',
    firstName: '',
    lastName: '',
    userId: '',
    cognitoUsername: '',
    email: '',
    role: '',

    order: 'descending',
    sort: 'new',
    view: '0',
    major: '',
    tag: '',
    advisor: '',
    acceptingApps: false,
    hasAdvisor: false,
  },
  mutations: {
    setToken: (state, token) => {
      state.id_token = token;
    },
    setFirstName: (state, firstName) => {
      state.firstName = firstName;
    },
    setLastName: (state, lastName) => {
      state.lastName = lastName;
    },
    setUserId: (state, userId) => {
      state.userId = userId;
    },
    setCognitoUsername: (state, cognitoUsername) => {
      state.cognitoUsername = cognitoUsername;
    },
    setEmail: (state, email) => {
      state.email = email;
    },
    setRole: (state, roles) => {
      if (roles.includes('faculty')) {
        state.role = 'Faculty';
      } else if (roles.includes('student')) {
        state.role = 'Student';
      } else if (roles.includes('employee')) {
        state.role = 'Employee';
      } else if (roles.includes('affiliate')) {
        state.role = 'Affiliate';
      } else if (roles.includes('former-student')) {
        state.role = 'Alumni';
      } else {
        state.role = 'Member';
      }
    },
    logout: (state) => {
      state.id_token = '';
      state.firstName = '';
      state.lastName = '';
      state.userId = '';
      state.cognitoUsername = '';
      state.email = '';
      state.role = '';
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
    setMajor: (state, major) => {
      state.major = major;
    },
    setTag: (state, tag) => {
      state.tag = tag;
    },
    setAdvisor: (state, advisor) => {
      state.advisor = advisor;
    },
    setAcceptingApps: (state, acceptingApps) => {
      state.acceptingApps = acceptingApps;
    },
    setHasAdvisor: (state, hasAdvisor) => {
      state.hasAdvisor = hasAdvisor;
    },
    resetSorts: (state) => {
      state.order = 'descending';
      state.sort = 'new';
      state.major = '';
      state.tag = '';
      state.advisor = '';
      state.acceptingApps = false;
      state.hasAdvisor = false;
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
