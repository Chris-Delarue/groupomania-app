<template>
    <div class="Post">
        <LoginForm v-if="!loggedIn"/>

        <NewPost v-if="loggedIn"/>
        <Posts v-if="loggedIn"/>
       
        <OnePost v-if="loggedIn"/>
        <Comments v-if="loggedIn"/>
        
    </div>
</template>

<script>

import LoginForm from '@/components/LoginForm.vue';

import OnePost from '@/components/OnePost.vue';
import Comments from '@/components/Comments.vue';import Posts from '@/components/Posts.vue';
import NewPost from '@/components/NewPost';


export default{
   name :'Post',

   components : {
      LoginForm,
      Posts,
      OnePost,
      Comments,
      NewPost
   },
   data() {
     return{
        loggedIn: true,
        authorized : true
     }
   },
   methods : {
     checkLoggedInOk() {
       if(sessionStorage !== undefined) {
         this.loggedIn = true;
         console.log('Vous êtes connecté');
       }
       else if(sessionStorage == undefined) {
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


