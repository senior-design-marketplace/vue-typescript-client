import axios from 'axios';
import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import ErrorDialog from '@/components/ErrorDialog.vue';

const env = process.env.NODE_ENV === 'production' ? 'production' : 'staging';
const apiUrl = 'https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/';

export default {
  methods: {
    authError() {
      const ComponentClass = Vue.extend(ErrorDialog);
      const vm = new ComponentClass({
        propsData: {
          value: true,
          text: 'Session expired. Redirecting to login.',
          src: '500.svg',
        },
      }).$mount();
      document.body.appendChild(vm.$el);
      store.commit('logout');
      const interval = setTimeout(() => {
        window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
      }, 3000);
    },
    otherError(errorText) {
      const ComponentClass = Vue.extend(ErrorDialog);
      const vm = new ComponentClass({
        propsData: {
          value: true,
          text: errorText,
          src: '500.svg',
        },
      }).$mount();
      document.body.appendChild(vm.$el);
    },
    async get(path, queryParams, savePath) {
      const url = `${apiUrl}${env}${path}?id_token=${store.state.userDetails.token}${queryParams}`;
      const resp = axios.get(url);
      resp
        .then((response) => {})
        .catch((error) => {
          if (error.response.data.type === 'AuthenticationError') {
            store.commit('setsavePath', savePath);
            this.authError();
          } else if (path !== '/' && error.response.status === 404) {
            router.push('/404');
          } else if (path !== '/') {
            router.push(`/error/${error.response.status}/${error.response.data.message}`);
          }
        });
      return resp;
    },
    async post(path, queryParams, body, savePath) {
      const url = `${apiUrl}${env}${path}?id_token=${store.state.userDetails.token}${queryParams}`;
      const resp = axios.post(url, body);
      resp
        .then((response) => {})
        .catch((error) => {
          if (error.response.data.type === 'AuthenticationError') {
            store.commit('setsavePath', savePath);
            this.authError();
          } else {
            this.otherError(`Error ${error.response.status}: ${error.response.data.message}`);
          }
        });
      return resp;
    },
    async delete(path, queryParams, body, savePath) {
      const url = `${apiUrl}${env}${path}?id_token=${store.state.userDetails.token}${queryParams}`;
      const resp = axios.delete(url, body);
      resp
        .then((response) => {})
        .catch((error) => {
          if (error.response.data.type === 'AuthenticationError') {
            store.commit('setsavePath', savePath);
            this.authError();
          } else {
            this.otherError(`Error ${error.response.status}: ${error.response.data.message}`);
          }
        });
      return resp;
    },
    async patch(path, queryParams, body, savePath) {
      const url = `${apiUrl}${env}${path}?id_token=${store.state.userDetails.token}${queryParams}`;
      const resp = axios.patch(url, body);
      resp
        .then((response) => {})
        .catch((error) => {
          if (error.response.data.type === 'AuthenticationError') {
            store.commit('setsavePath', savePath);
            this.authError();
          } else {
            this.otherError(`Error ${error.response.status}: ${error.response.data.message}`);
          }
        });
      return resp;
    },
    async put(path, queryParams, body, savePath) {
      const url = `${apiUrl}${env}${path}?id_token=${store.state.userDetails.token}${queryParams}`;
      const resp = axios.put(url, body);
      resp
        .then((response) => {})
        .catch((error) => {
          if (error.response.data.type === 'AuthenticationError') {
            store.commit('setsavePath', savePath);
            this.authError();
          } else {
            this.otherError(`Error ${error.response.status}: ${error.response.data.message}`);
          }
        });
      return resp;
    },
    async mediaUpload(path, fileType, mediaFile, savePath) {
      const url = `${apiUrl}${env}${path}?id_token=${store.state.userDetails.token}`;
      const resp = axios.post(url, {
        type: fileType,
      });
      let resp2;

      await resp
        .then((response) => {
          resp2 = this.s3Upload(response, mediaFile);
          return resp2;
        })
        .catch((error) => {
          if (error.response.data.type === 'AuthenticationError') {
            store.commit('setsavePath', savePath);
            this.authError();
          } else {
            this.otherError(`Error ${error.response.status}: ${error.response.data.message}`);
          }
        });
      return resp2;
    },
    async s3Upload(response, mediaFile) {
      const formData = new FormData();
      Object.keys(response.data.fields).forEach((key) => {
        formData.append(key, response.data.fields[key]);
      });
      formData.append('file', mediaFile);
      const resp = axios.post(response.data.url, formData);
      return resp;
    },
  },
};
