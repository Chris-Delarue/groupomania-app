<template>
    <div class="form-group">
        <form @submit.prevent = signup()>
            <img src="/assets/images/icon-left-font.png" alt="Logo Groupomania">
            <nav><router-link to="/">Identifiez-vous</router-link> | <router-link to="/signup" class="active">S'inscrire</router-link>
            </nav>
            <label for="signup-firstname">Votre nom :</label>
            <input type="text" id="signup-firstname" placeholder="Nom" required>

            <label for="signup-surname"> Votre prénom :</label>
            <input type="text" id="signup-surname" placeholder="Prenom" required>

            <label for="signup-email">Votre email :</label>
            <input type="email" id="signup-email" placeholder="email" required>

            <label for="signup-password">Votre mot de passe :</label>
            <input type="password" id="signup-password"  placeholder="Votre mot de passe" required> 

            <div class="msg-error">{{message}}</div>

            <button id="signup-btn" type="submit">S'inscrire</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';



export default {
    name :'SignupForm',

    data() {
        return {
            message :"",
        }
        
    },

    methods : {
        signup() {
            
        }
    }
}
</script>
