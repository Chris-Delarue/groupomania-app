<template>
    <div class="signup-group">
        <form @submit.prevent = signup()>
            <img src="/assets/images/icon-left-font.png" alt="Logo Groupomania">
            
            <label for="signup-name">Votre nom :</label>
            <input type="text" id="signup-firstname" v-model="name" required autofocus >

            <label for="signup-surname"> Votre prénom :</label>
            <input type="text" id="signup-surname" v-model="prenom" required autofocus>

            <label for="signup-email">Votre email :</label>
            <input type="email" id="signup-email" v-model="email" required>

            <label for="signup-password">Votre mot de passe :</label>
            <input type="password" id="signup-password"  v-model="password" required> 

            <label for="password-confirm">Confirmer votre mot de passe</label>
            <input type="password" id="password-confirm" v-model="password_confirmation" required>


            <button id="signup-btn" type="submit">S'inscrire</button>
        </form>
    </div>
</template>
<script>


export default {
    data(){
        return {
            name : "",
            prenom : "",
            email : "",
            password : "",
            password_confirmation : "",
            is_admin: null
        }
    },
    methods : {
        signup() => {
            let data = {
                name: this.name,
                prenom : this.prenom,
                email : this.email,
                password : this.password,
                is_admin : this.is_admin
            }
            this.$store.dispatch('signup', data)
            .then(() => this.$router.push('/'))
            .catch(error => console.log(error))
        }
    }
}
</script>
