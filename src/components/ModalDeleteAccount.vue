<template>
    <div class="bloc-modale" v-if="revele">

        <div @click.prevent="displayModale" class="overlay" ></div>

        <div class="modale_card">
            <div class="blocModale_card_title">
                <h2>Êtes-vous sûr de vouloir supprimer votre compte ?</h2>
                <p class="text_delete">En supprimant votre profil, vous effacerez aussi tous vos posts ainsi que vos commentaires.</p>
            </div>
            <div class="blocModale_card_title_close">
                <i @click="displayModale" class="far fa-times-circle fa-2x blocModale_card_title_close"></i>
            </div>
            <div id="blocModale_card_btn">
                <button @click.prevent="deleteAccount" class="blocModale_card_btn"> oui, je supprime mon compte</button>
            </div>
        </div>    
        <div>
            <div class="alert-error-message" v-html="errorMessage"/>
        </div>   
    </div>
</template>


<script>

import auth from '@/api/auth';

import httpClient from '@/api/httpClient';

export default {

    name: 'ModalDeleteAccount',
    props: ['revele', 'displayModale'],

    data() {
        return {
            errorMessage: ""
        }
    },

    methods: {

        async deleteAccount() {

            const userId = this.$store.state.user.userId 
            
            auth.deleteAccount(`${userId}`)
                
            .then((response) => {

                httpClient.defaults.headers.common['Authorization'] = response.data.token;

               
                
                this.$store.dispatch('logout')
                this.$router.push({name:"Login"});
                
            })
            .catch (()=> {
                
                this.errorMessage = "Votre compte n'a pas été supprimé !!"
            })
        },

    }

}



</script>

<style scoped>


.bloc-modale {
   
    position: fixed;
    width:100%;
    height:100%;
    top:0;
    bottom: 0;
    left:0;
    right:0;
    margin: auto;
    display: flex;
    justify-content:center;
    align-items: center;
    z-index:9999;
}
.overlay {
    background: rgba(17, 17, 17, 0.5);
    position: fixed;
    top: 0 ;
    right:0;
    bottom:0;
    left:0;
}
.modale_card{
    position: fixed;
    display: flex wrap;
    border: solid 1px;
    padding:.8rem;
    background-color:rgba(74, 165, 230);
}

.blocModale_card_title_close {
    cursor: pointer;
}
i {
    width: fit-content;
    color: red; 
}
.blocModale_card_title {
    text-align: center;
    margin: auto ;
}
button {
    border: solid 1px red;   
   }
.text_delete {
    font-weight:700;
    padding:.5rem;
}
#blocModale_card_btn {
    width: fit-content;
    margin: auto auto .8rem auto;
}
.blocModale_card_btn {
    background-color: rgba(29, 77, 112);
    color: white;
    border-radius: 30px;
    padding:.5rem;
    width:fit-content;
    
}
.alert-message{
      background-color: rgba(29, 77, 112);
      height:auto;
      width: auto;
      margin:  auto;
      color: white;
      text-align: center;
}
.alert-error-message{
      background-color: rgba(29, 77, 112);
      height:auto;
      width: auto;
      margin:  auto;
      color: white;
      text-align: center;
}

@media screen and (max-width:680px) {

.modale_card {
    position: fixed;
    display: flex wrap;
}

#blocModale_card_btn {
    width: fit-content;
    margin: auto auto .8rem auto;
}
.blocModale_card_btn {
    background-color: rgba(29, 77, 112);
    color: white;
    border-radius: 30px;
    padding:.5rem;
    width:fit-content;
    margin: auto;
}


}




</style>
