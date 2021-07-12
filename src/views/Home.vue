<template>
  <div class="home">

    <h1 class=" logo" >
        <img src="../assets/images/icon-above-font.png" alt="Logo Groupomania">
          </h1>
    <h2>Bienvenue sur votre réseau social !!</h2>
    
    <LoginForm v-if="!loggedIn"/>
  
    <Nav v-if="loggedIn"/>
    <NewPost v-if="loggedIn"/>
    <Posts v-if="loggedIn"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue';
import Nav from '@/components/Nav.vue';
import Posts from '@/components/Posts.vue';
import NewPost from '@/components/NewPost.vue';


export default {
  name: 'Home',
  component: {

    LoginForm,
    Nav,
    Posts,
    NewPost

  },
  data(){
    return{
      loggedIn:  true
    };
  },
  created() {
    this.checkLoggedInOk() 
  },
  methods : {
    checkLoggedInOk() {
      if(localStorage.user !== undefined) {
        this.loggedIn = true;
        console.log(('Vous êtes connecté !!'));
      }
      else if(localStorage.user == undefined) {
        this.loggedIn =  false;
        console.log('Vous n\'êtes pas connecté !!');

      }
    }
  }
}
</script>

<style scoped>
h1{
  margin-top: 5rem;
}

h2{
  text-align: center;
  margin-top:5rem;
}
</style>