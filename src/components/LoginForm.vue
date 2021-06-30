<template>
    <div class="login-form">
        <form class="login" @submit.prevent= login()>
            <h1>Se connecter</h1>
            <label>Email</label>
            <input required v-model="email" type="email" placeholder="Email"/>

            <label> Mot de passe</label>
            <input required v-model="password" type="password" placeholder="Mot de passe">
            
            <button type="submit">Se connecter</button>
        </form>

    </div>
</template>

<script>
export default {
    data(){
        return {
            email : "",
            password : ""
        }
    },
    methods :  {
        login () {
            let email = this.email
            let password = this.password
            this.$store.dispatch('login', {email, password })
            .then(() => this.$router.push('/'))
            .catch(error => console.log(error))
        }
    }
}
</script>
