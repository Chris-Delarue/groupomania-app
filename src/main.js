import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';



Vue.config.productionTip = false

Vue.prototype.$apiUrl = "http://localhost:3000/api";

if(localStorage.user != undefined) {
  Vue.prototype.$token = JSON.parse(localStorage.user).token;

  Vue.prototype.$user = JSON.parse(localStorage.user);

}

new Vue({
  router, 
  store,
  
  render: h => h(App)
}).$mount('#app');
