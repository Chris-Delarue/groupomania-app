import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import httpClient from './api/httpClient';


Vue.config.productionTip = false;

const moment = require('moment');
require('moment/locale/fr');

const token = `Bearer ${store.state.token}`
if(token) {
  httpClient.defaults.headers.common['Authorization'] = token;
}

Vue.use(require('vue-moment'), {
  moment
});

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app');
