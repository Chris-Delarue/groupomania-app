import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';


Vue.config.productionTip = false

const moment = require('moment');
require('moment/locale/fr');

Vue.use(require('vue-moment'), {
  moment
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
