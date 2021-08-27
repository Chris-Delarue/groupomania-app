<template>
    <div class="login">
         <div class=" logo" >
        <img src="../assets/images/icon-above-font.png" alt="Logo Groupomania">
          </div>
         <h2>Bienvenue sur votre réseau social !!</h2>
        <LoginForm/>

       
    </div>
</template>

<script>

import LoginForm from '@/components/LoginForm.vue';

export default {
    name: 'Login',

    components : {
        LoginForm
    },
}
</script>

<style >

h2{
  text-align: center;
  margin-top:5rem;
}

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