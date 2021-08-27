<template>
    <div class="signup">
       <div class=" logo" >
        <img src="../assets/images/icon-above-font.png" alt="Logo Groupomania">
          </div>
        <h2>Bienvenue sur votre réseau social !!</h2>
         <SignupForm/>
    </div>
</template>

<script>

import SignupForm from '@/components/SignupForm.vue';

export default {
    name: 'Signup',

    components : {
        SignupForm
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
