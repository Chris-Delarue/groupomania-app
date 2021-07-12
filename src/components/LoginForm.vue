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
          <div class="error-message">{{message}}</div>
          <div class="row">
            <div class="col-12 col-sm-4">
              <button type="submit" class="btn btn-primary">Se connecter</button>
            </div>
            <div class="col-12 col-sm-8 text-right">
              <a href="/signup">Vous n'avez pas encore de compte?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios'


export default {
    name : 'LoginForm',

    data(){
        return {
            email : "",
            password : ""
        }
    },
  
    methods : {
        login() {
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;
            

            axios.post(`${this.$apiUrl}/auth/login`,
                {
                     email,
                     password
                },
                {
                     headers : {
                            'Content-Type' : 'application/json'
                    }
                }
            )
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                location.href ="/Posts";
                this.message = "Vous êtes connecté !";
                console.log(localStorage.setItem())
               
            })
            .catch((error) => {
                if (error.res.status === 404) {
                    this.message = "Utilisateur non reconnu";
                }
                
                if(error.res.status=== 401) {
                    this.message = " Vérifier votre émail ou/et votre mot de passe";
                }
                if(error.res.status  === 500) {
                     this.message = "Error serveur";
                }
            })
        }
    }
}
</script>

<style scoped>

.error-message{
      background-color: rgba(233, 77, 103, 0.301);
      height:40px;
      width: 100%;
      margin: auto auto 1rem auto;
      color: black;
}

</style>