import axios from 'axios';
import store from '@/store';

const env = process.env.NODE_ENV === 'production' ? 'production' : 'staging';
const apiUrl = 'https://3q6zl3xokg.execute-api.us-east-1.amazonaws.com/';

export default {
  methods: {
    async get(path, queryParams, savePath) {
      const url = `${apiUrl}${env}${path}?id_token=${store.state.userDetails.token}${queryParams}`;
      const resp = axios.get(url);
      resp
        .then((response) => {})
        .catch((error) => {
          if (error.response.data.type === 'AuthenticationError') {
            alert("Session expired. Redirecting to Stevens Login"); // eslint-disable-line
            store.commit('setsavePath', savePath);
            window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
          } else if (error.response.data.message === 'Malformed request') {
            alert("Malformed request"); // eslint-disable-line
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
            alert("Session expired. Redirecting to Stevens Login"); // eslint-disable-line
            store.commit('setsavePath', savePath);
            window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
          } else if (error.response.data.message === 'Malformed request') {
            alert("Malformed request"); // eslint-disable-line
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
            alert("Session expired. Redirecting to Stevens Login"); // eslint-disable-line
            store.commit('setsavePath', savePath);
            window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
          } else if (error.response.data.message === 'Malformed request') {
            alert("Malformed request"); // eslint-disable-line
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
            alert("Session expired. Redirecting to Stevens Login"); // eslint-disable-line
            store.commit('setsavePath', savePath);
            window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
          } else if (error.response.data.message === 'Malformed request') {
            alert("Malformed request"); // eslint-disable-line
          }
        });
      return resp;
    },
  },
};
