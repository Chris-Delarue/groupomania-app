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
                                <input type="text" class="form-control" name="firstname" id="signup-firstname" required v-model="firstname" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label  for="surname">Nom</label>
                                <input type="text" class="form-control" name="surname" id="signup-surname" required  v-model="surname"/>
                            </div>
                        </div>

                        <div class="col-12">
                             <div class="form-group">
                                <label for="email">Email </label>
                                <input type="text" class="form-control" name="email" id="signup-email" required v-model="email"/>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 ">
                            <div class="form-group">
                                <label for="password">Mot de passe</label>
                                <input type="password" class="form-control" name="password" id="signup-password" required v-model="password"/>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label for="passwordConfirm">Confirmez le mot de passe</label>
                                <input type="password" class="form-control" name="passwordConfirm" id="signup-passwordConfirm"
                                required v-model="passwordConfirm"/>
                            </div>
                        </div>
                        <div>
                        <div class="alert-error-message" v-html="errorMessage"/>
                        <div class="alert-message" v-html="message"/></div>
                        <div class="row">
                            <div class="col-12 col-sm-4">
                                <button type="submit" class="btn btn-primary">S'inscrire</button>
                            </div>
                            <div class="col-12 col-sm-8 text-right text-signup">
                                <router-link to="/login">Vous avez déja un compte</router-link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import auth from "@/api/auth"

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
            visible: true,
        };
    },

    methods: {

         async signup(e) {
            e.preventDefaults
            try{
                const response = await auth.signup({
                    firstname : this.firstname,
                    surname : this.surname,
                    email: this.email,
                    password: this.password,
                    passwordConfirm : this.passwordConfirm,
                })
                
                 this.message = "bienvenue sur votre réseau !!",
                setTimeout(() => {
                    this.message = "" 
                    },1000)
                
                
                this.$store.dispatch("login", response.data);
                this.$router.push({name:"Login"}) 
                    
            } catch (error) {
                this.errorMessage ="oopps !!" ;    
            }
        },
    },
};
</script>

<style scoped>
 .alert-message{
        /* background-color: rgba(29, 77, 112); */
        text-align: center;   
        height:20px;
        width:90%;
        margin: auto ;
        color: black;
    }
.alert-error-message {
        /* background-color: rgba(29, 77, 112); */
        text-align: center;   
        height:20px;
        width:90%;
        margin: auto ;
        color: black;
}
.btn-primary {
    margin-top:1rem;
}
.text-signup {
    margin-top: 1rem;
}
.text-signup > a {
    
    text-decoration: none;
}
.fade-enter-active, .fade-leave-active {
    transition : opacity .8s;
}
.fade-enter, .fade-leave-to {
    opacity : 0;
}
</style>
