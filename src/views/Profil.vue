<template>
    <div class="profil">

        <div class=" logo" >
        <img src="../assets/images/icon-above-font.png" alt="Logo Groupomania">
          </div>
        <LoginForm v-if="!loggedIn"/>
        
        <UserProfil v-if="loggedIn"/>
      
    </div>
</template>

<script>

import LoginForm from'@/components/LoginForm.vue';

import UserProfil from '@/components/UserProfil.vue';
import { mapGetters } from "vuex";


export default {
    name : 'Profil',
    components : {
        LoginForm,
        UserProfil
       
   
    },
  
    computed: {

      ...mapGetters({loggedIn: "isLogged"}),
        
    },
    
}
</script>

<style scoped>

img{
  width: 100%;
  height:100%;
  border-radius: 100px;
}
.logo{
  width: 30%;
  height:30%;
  margin: 1rem auto;
  border: solid 2px green;
  border-radius : 100px;
}
</style>
