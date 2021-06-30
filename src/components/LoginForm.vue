<template>
    <div class="form-group">
        <form @submit.prevent = login()>
            <img src="/assets/images/icon-left-font.png" alt="Logo Groupomania">

            <label for="signup-email">Votre email :</label>
            <input type="email" id="login-email" placeholder="email" required>

            <label for="signup-password">Votre mot de passe :</label>
            <input type="password" id="login-password"  placeholder="mot de passe" required> 

            <div class="error-message">{{message}}</div>

            <button id="signup-btn" type="submit">Se connecter</button>
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
