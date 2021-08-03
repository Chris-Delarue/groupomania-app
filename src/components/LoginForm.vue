<template>
  <div class="row">
    <h1 class=" logo" >
        <img src="../assets/images/icon-above-font.png" alt="Logo Groupomania">
          </h1>
    <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-5 pt-3 pb-3 bg-white from-wrapper">
      <div class="container">
        <h3>Se connecter</h3>
        <hr>
        
        <form @submit.prevent="login">
          <div class="form-group">
           <label for="email">Email </label>
           <input type="text" class="form-control" name="email" id="login-email" v-model="email" >
          </div>
          <div class="form-group">
           <label for="password">Mot de passe</label>
           <input type="password" class="form-control" name="password" id="login-password" v-model="password" >
          </div>
          <div class="alert-message" v-html="errorMessage"/>
          <div class="alert-message" v-html="message"></div>
          <div class="row">
            <div class="col-12 col-sm-4">
              <button type="submit" class="btn btn-primary">Se connecter</button>
            </div>
            <div class="col-12 col-sm-8 text-right">
              <a  class="textPasCompte" href="/signup">Vous n'avez pas encore de compte?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>

import auth from '../api/auth'


export default {
    name : 'LoginForm',

    data(){
        return {
            email : "",
            password : "",
            errorMessage: null,
            message: null,
        }
    },
  
    methods : {
      async login() {
        try {
          const response = await auth.login({
            email: this.email,
            password: this.password,
            
          });
          this.message = "Merci de votre retour !!";
          this.$store.dispatch("setToken", response.data)
      
          let router = this.$router;
          setTimeout(function () {
            router.push("/post");
          }, 2000) 
        } catch (error) {
          this.errorMessage = "Etes vous bien inscrit !!";
          setTimeout(() => {
            this.email = "",
            this.password= "",
            this.errorMessage = ""
        }, 1000 )
      }  
    },
  },
};
</script>

<style scoped>

.alert-message{
      background-color: rgba(233, 77, 103, 0.301);
      height:20px;
      width: 100%;
      margin: auto;
      color: black;
      text-align: center;
}
.btn {
  margin-top: .8rem;

}
.textPasCompte{
  margin: .5rem ;
}
.text-right {
  margin-top: .5rem;
}

</style>