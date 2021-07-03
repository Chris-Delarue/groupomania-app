import Vue from 'vue';
import VueRouter from 'vue-router';
import Post from '../views/Post.vue';
import Home from '../views/Home.vue';



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post/:userId',
    name: 'Post',
    component: Post
  },
  {
    path :'/signup',
    name : 'Signup',
    component: () => import(`../views/Signup.vue`)
  },
  {
    path :'/login',
    name : 'Login',
    component : () => import(`../views/Login.vue`)
  }
  {
    path : '/profil',
    name : 'Profil',
    component: () => import(`../views/Profil.vue`)
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
