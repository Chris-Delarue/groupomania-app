<template>
    <div class="Post">
      <div class="logo" >
            <img src="../assets/images/icon-above-font.png" alt="Logo Groupomania">
        </div>
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
  
    computed : {

        loggedIn() { 
          return this.$store.getters.isLogged
            }, 
    },
}
</script>

<style scoped>

.Post{
   
    width:80%;
    margin:auto auto 1rem auto;
}
img{
  width: 100%;
  height:20%;
  border-radius: 300px;
}
.logo{
  width: 30%;
  height:20%;
  margin: 2.5rem auto;
  border: solid 2px rgba(29, 77, 112);
  border-radius: 300px;
}
</style>


