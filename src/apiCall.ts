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
            alert("Session expired. Redirecting to Stevens Login"); // eslint-disable-line
            store.commit('setsavePath', savePath);
            window.location.href = 'https://marqetplace.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=stevens-shibboleth&redirect_uri=https://www.marqetplace.xyz&response_type=TOKEN&client_id=6893005so6v9k2kuunc4acckps';
          } else if (error.response.data.message === 'Malformed request') {
            alert("Malformed request"); // eslint-disable-line
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
      // resp
      //   .then((response2 ) => {
      //     console.log(response2); // eslint-disable-line
      //   })
      //   .catch((error) => {
      //     console.log(error); // eslint-disable-line
      //   });
      return resp;
    },
  },
};
