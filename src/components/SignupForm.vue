<template>
    <div class="signup-group">
         
            <img  src="/images/icon-above-font.png" class="logo" alt="Logo Groupomania"/>
            <nav><router-link to="/">Se connecter</router-link> | <router-link to="/signup" class="active">S'inscrire</router-link></nav>

        <form class="form" @submit.prevent = signup()>
            
            <label for="signup-firstname">Votre nom :</label>
            <input type="text" id="signup-firstname" placeholder="nom" required autofocus >

            <label for="signup-surname"> Votre prénom :</label>
            <input type="text" id="signup-surname" placeholder="prenom" required autofocus>

            <label for="signup-email">Votre email :</label>
            <input type="email" id="signup-email" placeholder="email" required>

            <label for="signup-password">Votre mot de passe :</label>
            <input type="password" id="signup-password"  placeholder="Mot de passe" required> 

            <label for="password-confirm">Confirmer votre mot de passe</label>
            <input type="password" id="signup-password-confirm" placeholder="Confirmer le mot de passe" required>

            <div class="error-message">{{message}}</div>

            <button id="signup-btn"  @click="signup()">S'inscrire</button>
        </form>
    </div>
</template>
<script>

import axios from 'axios'

export default {
    name : 'SignupForm',

    data(){
        return {
            message : "",
        }
    },

    methods : {

        signup() {
            
            const firstname = document.getElementById("signup-firstname").value;
            const surname = document.getElementById("signup-surname").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;
            const passwordConfirm = document.getElementById("signup-password-confirm").value;

            if(password === passwordConfirm) {
                axios.post(`${this.$apiUrl}/auth/signup`,
                {
                    firstname,
                    surname,
                    email,
                    password,
                    passwordConfirm

                },
                {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }
                )
                .then(res => {
                    if(res.status === 201){
                        location.href = '/'
                    }
                })
                .catch((error) => {
                    if (error.res.status === 401) {
                        this.message = "Email non disponible"
                    }
                });
            }
            else if(password != passwordConfirm) {
                this.message = " Vérifier votre émail ou/et votre mot de passe"
            }
        }
    }
}
</script>

<style scoped>


.form{
    width: 700px;
    margin:  2rem auto;
    border : solid 1px;
    border-radius: 20px;
     display: flex;
    flex-flow: column;
    justify-content: center;
    padding-top:.8rem;

}
input{
    height: 30px;
    width: 60%;
    border-radius: 10px;
    text-align: center;
    border: solid 2px red;
    margin:.5rem auto .8rem auto;
   
}

#signup-btn{
    height:30px;
    border-radius: 10px;
    width:20%;
    margin: 1rem auto;
}



</style>
