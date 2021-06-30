<template>
  <div class="home">
    <LoginForm v-if="!connected"/>
    <SignupForm v-if="!connected"/>
    <Nav v-if="connected"/>
    <NewPost v-if="connected"/>
    <Post v-if="connected"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue';
import  Nav from '@/components/Nav.vue';
import SignupForm from '@/components/SignupForm.vue';


export default {
  name: 'Home',
  components: {

    LoginForm,
    SignupForm,
     //Post,
   Nav,
    //NewPost
  },
  data(){
    return{
      connected:  true
    };
  },
  created() {
    this.connectionOk() 
  },
  methods : {
    connectionOk() {
      if(localStorage.user !== undefined) {
        this.connected = true;
        console.log(('Vous êtes connecté!!'));
      }
      else if(localStorage.user == undefined) {
        this.connected =  false;
        console.log('Vous n\'êtes pas connecté !!');

      }
    }
  }
}
</script>
