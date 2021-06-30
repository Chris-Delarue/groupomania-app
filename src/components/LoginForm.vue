<template>
    <div class="form-group">
         <img src="/images/icon-left-font.png" alt="Logo Groupomania"/>
       
        <form class="form" @submit.prevent = login()>
            
            <label for="signup-email">Votre email :</label>
            <input type="email" id="login-email" placeholder="email" required>

            <label for="signup-password">Votre mot de passe :</label>
            <input type="password" id="login-password"  placeholder="mot de passe" required> 

            <div class="error-message">{{message}}</div>

            <button id="login-btn" type="submit">Se connecter</button>
        
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'LoginForm',

    data(){
        return {
            message : "",
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
                location.reload();
            })
            .catch((error) => {
                if (error.res.status === 404) {
                    this.message = "Utilisateur non reconnu"
                }
                
                if(error.res.status === 401) {
                    this.message = " Vérifier votre émail ou/et votre mot de passe"
                }
                if(error.res.status === 500) {
                     this.message = "Error serveur"
                }
            })
        }
    }
}
</script>

<style lang="css" >

.form{
    width: 700px;
    margin:  auto;
    border : solid 1px;
    border-radius: 20px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding-top: .8rem;
}
input{
    height: 30px;
    width: 60%;
    border-radius: 10px;
    text-align: center;
    border: solid 2px red;
    margin:.5rem auto .8rem auto;
   
}
#login-btn{
    height:30px;
    border-radius: 10px;
    width:20%;
    margin: 1rem auto;
}
</style>
