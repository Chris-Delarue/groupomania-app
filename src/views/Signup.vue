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
