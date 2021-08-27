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
      Comments,
      
   },
   data() {
     return{
        loggedIn: true,
        authorized : true
     }
   },
   methods : {
     checkLoggedInOk() {
       if(sessionStorage.vuex !== undefined) {
         this.loggedIn = true;
         console.log('Vous êtes connecté');
       }
       else if(sessionStorage.vuex == undefined) {
         this.loggedIn = false;
         console.log('Vous n\'êtes pas connecté !')
       }
     }
   },
   created() {
     this.checkLoggedInOk()
   }
}
</script>


