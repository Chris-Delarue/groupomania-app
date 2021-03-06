import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';



Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component : Home
  },
  
  {
    path:'/post/:postId',
    name : 'Post',
    component : () => import('../views/Post.vue'),
    beforeEnter: (to, from, next) => {
      if(!sessionStorage.getItem("vuex")) {
        next({name: 'Home'});
     }else{
        next();
      }
    }
  },
  
  {
    path :'/signup',
    name : 'Signup',
    component : () => import('../views/Signup.vue')
  },
  {
  path :'/login',
    name : 'Login',
    component : () => import('../views/Login.vue')
  },
  {
    path : '/profil',
    name : 'Profil/',
    component : () => import('../views/Profil.vue'),
    beforeEnter: (to, from, next) => {
      if(!sessionStorage.getItem("vuex")) {
        next("/");
      }else{
        next();
      }
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
