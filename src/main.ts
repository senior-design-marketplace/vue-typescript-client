import Vue from 'vue';
import attachCognitoModule from '@vuetify/vuex-cognito-module';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// attachCognitoModule(store, { // Hold off on amplify for now
//   userPoolId: 'your-data-here',
//   identityPoolId: '', // This field is now optional
//   userPoolWebClientId: 'your-data-here',
//   region: 'your-data-here',
// }, 'cognito');

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
