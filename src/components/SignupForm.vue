<template>
    <div class="signup-group">
        <form @submit.prevent = signup()>
            <img src="/assets/images/icon-left-font.png" alt="Logo Groupomania">
            

            <label for="signup-firstname">Votre nom :</label>
            <input type="text" id="signup-firstname" placeholder="name" required autofocus >

            <label for="signup-name">Votre nom :</label>


            <label for="signup-surname"> Votre prénom :</label>
            <input type="text" id="signup-surname" v-model="prenom" required autofocus>

            <label for="signup-email">Votre email :</label>
            <input type="email" id="signup-email" v-model="email" required>

            <label for="signup-password">Votre mot de passe :</label>
            <input type="password" id="signup-password"  pl aceholder="Mot de passe" required> 

            <label for="password-confirm">Confirmer votre mot de passe</label>
            <input type="password" id="password-confirm" placeholder="Confirmer le mot de passe" required>

            <div class="error-message">{{message}}</div>

            <input type="password" id="signup-password"  placeholder="password" required> 

            <label for="password-confirm">Confirmer votre mot de passe</label>
            <input type="password" id="password-confirm" placeholder="password_confirmation" required>

            <div class="error-message">{{message}}</div>

            <button id="signup-btn" type="submit">S'inscrire</button>
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
            const passwordConfirm = document.getElementById("password-confirm").value;

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
