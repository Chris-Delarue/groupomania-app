<template>
    <div class="Post">
        <LoginForm v-if="!loggedIn"/>
        
        <Posts v-if="loggedIn"/>
        <Nav v-if="loggedIn"/>
        <OnePost v-if="loggedIn"/>
        <Comments v-if="loggedIn"/>
    </div>
</template>

<script>

import LoginForm from '@/components/LoginForm.vue';
import Nav from '@/components/Nav.vue';
import OnePost from '@/components/OnePost.vue';
import Comments from '@/components/Comments.vue';
import Posts from '@/components/Posts.vue';



export default{
   name :'Post',

   component : {
     LoginForm,
     Nav,
     Posts,
     OnePost,
     Comments
   },
   data() {
     return{
        loggedIn: true,
        authorized : true
     }
   },
   methods : {
     checkLoggedInOk() {
       if(localStorage.user !== undefined) {
         this.loggedIn = true;
         console.log('Vous êtes connecté');
       }
       else if(localStorage.user == undefined) {
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
