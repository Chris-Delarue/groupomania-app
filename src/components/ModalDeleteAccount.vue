<template>
    <div class="bloc-modale" v-if="revele">

        <div @click.prevent="displayModale" class="overlay" ></div>

        <div class="modale_card">
            <div class="blocModale_card_title">
                <h2>Etes-vous sûr de vouloir supprimer votre compte ?</h2>
            </div>
            <div class="blocModale_card_title_close">
                <i @click="displayModale" class="far fa-times-circle fa-2x blocModale_card_title_close"></i>
            </div>
        </div>
        <button @click.prevent="deleteAccount" class="blocModale_card_btn"> oui, je supprime mon compte</button>
    <div class="alert-message" v-html="errorMessage"/>
    <div class="alert-message" v-html="message"></div>   
    </div>
</template>


<script>

import auth from '@/api/auth';

export default {

    name: 'ModalDeleteAccount',
    props: ['revele', 'displayModale'],

    data() {
        return {
            message:"",
            errorMessage: ""
        }
    },

    methods: {

        async deleteAccount() {

            const userId = this.$store.state.user.userId 
            
            auth.deleteAccount(`${userId}`)
                
            .then((response) => {
                console.log(response)
                    
                this.message = "Nous avons supprimé votre compte !!" 
                this.$store.dispatch("logout");
                this.$router.push({name:"Login"})
                sessionStorage.clear();
               
            })
            .catch (error => {
                console.log(error)
                this.errorMessage = "Votre compte n'a pas été supprimé !!"
            })
        },

    }

}



</script>

<style scoped>



.bloc-modale {
    position: fixed;
    width:50%;
    height:50%;
    margin:2rem auto;
    display: flex;
    justify-content:center;
    align-items: center;
}
.overlay {
    background: rgba(166, 245, 205, 0.5);
    position: fixed;
    top: 0 ;
    right:0;
    bottom:0;
    left:0;
}
.blocModale_card_title {
    text-align: center;
}

.blocModale_card_btn {
    position: absolute;
    top:2;
    bottom:0;
    left:2;
    right:2;
    margin-bottom:5rem;
    background-color: green;
    color: white;
    border-radius:50px;
    


}
.alert-message{
      background-color: rgba(98, 245, 130, 0.301);
      height:auto;
      width: auto;
      margin:  auto;
      color: black;
      text-align: center;
}




</style>
