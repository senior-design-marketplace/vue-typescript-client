import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    savePath: '/',
    majors: [],
    tags: [],
    notifications: [],
    applications: [],
    userDetails: {
      token: '',
      id: '',
      cognitoUsername: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      bio: '',
      thumbnailLink: '',
      contributorOn: [],
      administratorOn: [],
    },
    filters: {
      sort: 'new',
      order: 'descending',
      major: '',
      tag: '',
      advisor: '',
      acceptingApps: false,
      hasAdvisor: false,
      view: '0',
    },
  },
  mutations: {
    updateFilter: (state, { filter, value }) => {
      state.filters[filter] = value;
    },
    resetFilters: (state) => {
      state.filters = {
        sort: 'new',
        order: 'descending',
        major: '',
        tag: '',
        advisor: '',
        acceptingApps: false,
        hasAdvisor: false,
        view: state.filters.view,
      };
    },
    updateUserDetail: (state, { detail, value }) => {
      if (detail === 'role') {
        if (value.includes('faculty')) {
          state.userDetails.role = 'Faculty';
        } else if (value.includes('student')) {
          state.userDetails.role = 'Student';
        } else if (value.includes('employee')) {
          state.userDetails.role = 'Employee';
        } else if (value.includes('affiliate')) {
          state.userDetails.role = 'Affiliate';
        } else if (value.includes('former-student')) {
          state.userDetails.role = 'Alumni';
        } else {
          state.userDetails.role = 'Member';
        }
      } else {
        state.userDetails[detail] = value;
      }
    },
    logout: (state) => {
      state.notifications = [];
      state.applications = [];
      state.userDetails = {
        token: '',
        id: '',
        cognitoUsername: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        bio: '',
        thumbnailLink: '',
        contributorOn: [],
        administratorOn: [],
      };
    },
    setsavePath: (state, path) => {
      state.savePath = path;
    },
    resetSavePath: (state) => {
      state.savePath = '';
    },

    setMajors: (state, majors) => {
      state.majors = majors;
    },
    setTags: (state, tags) => {
      state.tags = tags;
    },
    setNotifications: (state, notifications) => {
      state.notifications = notifications;
    },
    setApplications: (state, applications) => {
      state.applications = applications;
    },
  },
  getters: {
    isLoggedIn: state => state.userDetails.token.length !== 0,
    isAdmin: state => (projectId) => {
      const projectIds = state.userDetails.administratorOn.map(a => a.id);
      return projectIds.includes(projectId);
    },
    isContributor: state => (projectId) => {
      const projectIds = state.userDetails.contributorOn.map(a => a.id);
      return projectIds.includes(projectId);
    },
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
