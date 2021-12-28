<template>
  <div class="home" > 
      <div class="logo" >
        <img src="../assets/images/icon-above-font.png" alt="Logo Groupomania">
          </div>
        <h2 class="homeText">Bienvenue sur votre réseau social !!</h2>
        
      
    <LoginForm v-if="!loggedIn"/>
    
   
    
    <Posts v-if="loggedIn"/>
   
  

  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

import Posts from '@/components/Posts.vue';


export default {
 
  name: 'Home',
  components : { 
    LoginForm,
    Posts,
   
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
  font-size : 30px;
  text-align: center;
  margin:2rem;
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