<template>
    <div class="UserProfil" >
        <div class="text">
            <h1>Bonjour {{ }}</h1>
        </div>
            
        <div class="deleteProfil" @click.prevent="deleteAccount">Supprimer votre compte</div>
       
          <div class="alert-message" v-html="errorMessage"/>
          <div class="alert-message" v-html="message"></div>
    </div>
</template>

<script>

import auth from '../api/auth';

export default {
    name: 'UserProfil',
 

    data() {
        return {
            message: null,
            errorMessage: null,
           
        }
    },
  
    methods : {

         async deleteAccount() {

            try {
                 const response = await auth.deleteAccount()
                
                    this.message = "Votre compte à été supprimé !!"
                    console.log(response.userId)
                    this.$store.dispatch("logout")
                    sessionStorage.clear();
                    let router = this.$router;
                    setTimeout(function() {
                    router.push("/");
                    }, 2000);
                    
                    
            }catch (error) {
                    this.errorMessage = "oppss vous êtes toujours là !!"
            } 

        }
    },
}

</script>

<style scoped>

.UserProfil{
   
    width: 100%;
    height:auto;
    margin: 5rem auto;
    padding: .8rem;
    border: solid 1px;
    text-align: center;
}
.deleteProfil{
    width: 100%;
    color:  red;
    border: solid 1px red;
    border-radius: 30px;
    padding:.5rem;
    margin:5rem auto 5rem auto;
}
.alert-message{
      background-color: rgba(98, 245, 130, 0.301);
      height:20px;
      width: 100%;
      margin:  auto;
      color: black;
      text-align: center;
}
.text {
    width: 100%;
    margin: auto;
}



</style>
