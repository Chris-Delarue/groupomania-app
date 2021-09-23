<template>
    <div class="bloc-modale" v-if="revele">

        <div @click.prevent="displayModale" class="overlay" ></div>

        <div class="modale_card">
            <div class="blocModale_card_title">
                <h2>Etes-vous sûr de vouloir supprimer votre post ?</h2>
            </div>
            <div class="blocModale_card_title_close">
                <i @click="displayModale" class="far fa-times-circle fa-2x blocModale_card_title_close"></i>
            </div>
        </div>
        <button @click.prevent="deletePost" class="blocModale_card_btn"> oui, je supprime mon post</button>
        <div>
            <div class="alert-message" v-html="errorMessage"/>
            <div class="alert-message" v-html="message"/>
        </div>   
    </div>
</template>


<script>

import post from '@/api/post';

export default {

    name: 'ModalDeletePost',
    props: ['revele', 'displayModale'],

    data() {
        return {
            message:"",
            errorMessage: ""
        }
    },

    methods: {

        async deletePost() {

            
                const postId = this.$route.params.postId

                post.deletePost(`${postId}`,)

                .then(() => {

                    
                
                    this.message = "Nous avons supprimer votre post !!" 
                    this.$router.push({name : "Home"});
                   
                })

                .catch (error => {
                    console.log(error)
                    this.errorMessage = "Votre post n'a pas été supprimé  et/ou vous n'avez pas l'autorisation !!"
                    this.$router.push({name : "Home"});
                   
                })
            
        },

    }

}



</script>

<style scoped>



.bloc-modale {
    border:solid 4px;
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

.blocModale_card_title {
    text-align: center;
}
button {
    border: solid 1px red;  
    margin:20rem;
}

.blocModale_card_btn {
    position: absolute;
    top:2;
    bottom:0;
    left:2;
    right:2;
  
    background-color: rgba(98, 245, 130, 0.301);
    color: red;
    border-radius: 30px;
    padding:.5rem;
    width:40%;
    
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