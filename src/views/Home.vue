<template>
  <div class="home" > 
      
        <h2 class="homeText">Bienvenue sur votre réseau social !!</h2>
        <div class="logo" >
        <img src="../assets/images/icon-above-font.png" alt="Logo Groupomania">
          </div>
      
    <LoginForm v-if="!loggedIn"/>
    
   
    <NewPost v-if="loggedIn"/>
    <Posts v-if="loggedIn"/>
   
  

  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import NewPost from '@/components/NewPost.vue';
import Posts from '@/components/Posts.vue';

//import { mapGetters } from "vuex";


export default {
 
  name: 'Home',
  components : { 
    LoginForm,
    Posts,
    NewPost
    },
    
    computed: {
        loggedIn() { 
            return this.$store.getters.isLogged
            }
    },
}
</script>

<style scoped>

.homeText {
  font-size : 23px;
  text-align: center;
  margin:2rem;
}
img{
  width: 100%;
  height:100%;
  border-radius: 100px;
}
.logo{
  width: 30%;
  height:30%;
  margin: auto;
  border: solid 2px green;
  border-radius : 100px;
}

</style>