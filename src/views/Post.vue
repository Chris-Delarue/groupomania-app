<template>
    <div class="Post">
      <LoginForm v-if="!loggedIn"/>

      <OnePost v-if="loggedIn"/>
      <Comments v-if="loggedIn"/>
    </div>
</template>

<script>

import LoginForm from '@/components/LoginForm.vue';

import OnePost from '@/components/OnePost.vue';
import Comments from '@/components/Comments.vue';


export default{
   name :'Post',

   components : {
      LoginForm,
      OnePost,
      Comments
      
   },
   data() {
     return{
        authorized : true
     }
   },
  
    computed : {

        loggedIn() { 
          return this.$store.getters.isLogged
            }, 
    },
}
</script>

<style scoped>

.Post{
    background-color: #f3debb;
}
</style>


