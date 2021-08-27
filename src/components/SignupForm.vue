<template>
    <div class="row">
        
        <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-5 pt-3 pb-3 bg-white from-wrapper">
              
            <div class="container">
             
                <h3>S'inscrire</h3>
                <hr>
                <form  @submit.prevent="signup" >
                    <div class="row">
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label for="firstname">Prénom</label>
                                <input type="text" class="form-control" name="firstname" id="signup-firstname" v-model="firstname" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label  for="surname">Nom</label>
                                <input type="text" class="form-control" name="surname" id="signup-surname" v-model="surname"/>
                            </div>
                        </div>

                        <div class="col-12">
                             <div class="form-group">
                                <label for="email">Email </label>
                                <input type="text" class="form-control" name="email" id="signup-email" v-model="email"/>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 ">
                            <div class="form-group">
                                <label for="password">Mot de passe</label>
                                <input type="password" class="form-control" name="password" id="signup-password" v-model="password"/>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label for="passwordConfirm">Confirmez le mot de passe</label>
                                <input type="password" class="form-control" name="passwordConfirm" id="signup-passwordConfirm"
                                v-model="passwordConfirm"/>
                            </div>
                        </div>
                        <div class="alert-message" v-html="errorMessage"/>
                        <div class="alert-message" v-html="message"></div>
                        <div class="row">
                            <div class="col-12 col-sm-4">
                                <button type="submit" class="btn btn-primary">S'inscrire</button>
                            </div>
                            <div class="col-12 col-sm-8 text-right">
                                <a href="/login">Vous avez déja un compte</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import auth from "../api/auth"

export default {
    name: 'SignupForm',

    data() {
        return {
            firstname: "",
            surname: "",
            email: "",
            password: "",
            passwordConfirm: "",
            errorMessage : null,
            message: null,
        };
    },

    methods: {

         async signup() {
            
            try{
                const response = await auth.signup({
                    firstname : this.firstname,
                    surname : this.surname,
                    email: this.email,
                    password: this.password,
                    passwordConfirm : this.passwordConfirm,
                }); 
                this.message = "bienvenue sur votre réseau !!";
                this.$store.dispatch("login", response.data);

                let router = this.$router;
                setTimeout(function() {
                    router.push("/login");
                }, 2000);
            } catch (error) {
                this.errorMessage ="oopps !!" ;
                setTimeout(() => {
                    this.errorMessage = "";
                }, 2000)
            }
        },
    },
};
</script>

<style scoped>

 .alert-message{
        background-color: rgba(98, 245, 130, 0.301);
        text-align: center;   
        height:40px;
        width:90%;
        margin: auto auto 1rem auto;
        color: black;
    }



</style>
