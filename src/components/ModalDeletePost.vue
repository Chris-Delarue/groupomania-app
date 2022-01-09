<template>
    <div class="bloc-modale" v-if="revele">

        <div @click.prevent="displayModale" class="overlay" ></div>

        <div class="modale_card">
            <div class="blocModale_card_title">
                <h2>Êtes-vous sûr de vouloir supprimer votre post ?</h2>
                <p class="text_delete">En supprimant votre post, vous effacerez aussi tous vos  commentaires lié à ce post.</p>
            </div>
            <div class="blocModale_card_title_close">
                <i @click="displayModale" class="far fa-times-circle fa-2x blocModale_card_title_close"></i>
            </div>
        
            <div id="blocModale_card_btn">
                <button @click.prevent="deletePost"  class="blocModale_card_btn"  v-if="authorized"> oui, je supprime mon post</button>
            </div>
        </div>    
        <div>
            <div class="alert-message" v-html="errorMessage"/>
            <div class="alert-message" v-html="message"/>
        </div>   
    </div>
</template>


<script>

import post from '@/api/post';
import store from "@/store/index"


export default {

    name: 'ModalDeletePost',
    props: ['revele', 'displayModale'],

    data() {
        return {
            message:"",
            errorMessage: "",
            authorized: true,
            post: []
        }
    },

    methods: {

        async deletePost() {
               
            const postId = this.$route.params.postId
            

            if(store.state.user.userId == this.post.userId || store.state.user.isAdmin == true) {
                this.authorized = true
            }
            else {
                this.authorized = false
            }
            
            post.deletePost(`${postId}`,
            
            )

             .then(()=> {

                this.message = "Nous avons supprimer votre post !!" 
                setTimeout(() => {
                    this.message=""
                }, 2000)

                this.$router.push({name : "Home"});
                   
             })
            .catch (() => {

                this.errorMessage = "Votre post n'a pas été supprimé  et/ou vous n'avez pas l'autorisation !!"
                setTimeout(() => {
                    this.errorMessage=""
                },2000)
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
.modale_card{
    position: fixed;
    display: flex wrap;
    border: solid 1px;
    padding:.8rem;
    background-color:rgb(74, 165, 230);
    width:60%;
    height:30%;
}

.blocModale_card_title_close {
    cursor: pointer;
}
i {
    width: fit-content;
    color: red; 
}
.text_delete {
    font-weight:700;
    padding:.5rem;
}

.blocModale_card_title {
    text-align: center;
}
button {
    border: solid 1px red;  

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