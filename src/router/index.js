import Vue from 'vue';
import VueRouter from 'vue-router';
import Post from '../views/Post.vue'
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
    components: Post
  },
  {
    path :'/signup',
    name : 'Signup',
    components : () => import('../views/Signup.vue')
  },
  {
    path : '/profil',
    name : 'Profil',
    components : () => import('../views/Profil.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
