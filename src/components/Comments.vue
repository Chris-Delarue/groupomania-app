<template>
    <div  class="newComment">
        <form @submit.prevent="publishComment" class="form">
            <label for="new-comment" 
            class="header-new-comment">Commenter le post :</label>
            <textarea name="newComment" id="new-comment" placeholder="Rédiger votre commentaire..." required></textarea>
            <button type="submit" id="newComment-btn">Publier</button>
        </form>
        <div class="head-comment">
        <h2 v-if="comments.length > 0" >Commentaires :</h2>
       </div>
        <div class="comments" >
            <div  class="comment" v-for="comment in comments" :key="comment.commentId">
                <div class="info-C">Commenté le : {{comment.createdAt | moment("DD  MM YYYY à HH:mm")}} Par : {{comment.firstname}} {{comment.surname}} 
                </div>
                <div class="text-comment"> 
                  {{comment.content}}
                </div>
             <div id="btn-sup-comment" >
                    <button class="btn-sup-comment" @click.prevent="deleteComment(comment.commentId)" v-if="$store.state.user.userId == comment.userId || $store.state.user.isAdmin == 1" > Supprimer</button> 
                </div>   
            </div> 
            
        </div>
        <div>
            <div class="alert-error-message" v-html="errorMessage"/>
            <div class="alert-message" v-html="message"/>
        </div> 
    </div> 
</template>

<script>


import post from '@/api/post';


export default {
        name: 'Comments',
       
    data() {
        return {
            comments: [],
            key : process.env.VUE_APP_TYNI,
            errorMessage: null,
            content:"",
            message: null,
        }
    },
     
     mounted() {

         this.getAllComment();
     },
     methods: { 
            
            async publishComment() { 
                   
                const postId = parseInt(this.$route.params.postId)
                const userId = this.$store.state.user.userId
                const content = document.getElementById('new-comment').value;
                    
                post.newComment(`${postId}/comment/`,{

                    postId,
                    content,
                    userId
                    })

                .then(() => {

                    

                    this.message = "Votre commentaire a été publié !!" 
                        
                    setTimeout(() => {
                        this.message = "" 
                    },1000)
                    this.$router.push({name : "Home"})

                })
                .catch (()=> {
                    this.errorMessage = "oppss!!";
                    
                })      
            },
            async getAllComment() {

            const postId = parseInt(this.$route.params.postId)

            post.getComment(`${postId}/comment/`)

            .then(response => {

                this.comments = response.data
                
            })
            .catch (() => {
                this.errorMessage = "Something went wrong !!"
                
            })
        },
               
        async deleteComment(commentId) {

            post.deleteComment(`${commentId}`,)

            .then(()=> {

                this.comments = this.comments.filter( c => c.commentId != commentId)

                this.message = "Nous avons supprimé votre commentaire !!" 
                setTimeout(() => {
                     this.message = "" 
                },2000)
                
            })
            .catch (()=> {
                this.errorMessage = "Commentaire non supprimé !!"
                setTimeout(() => {
                     this.errorMessage = "" 
                },2000)
                
             })
        },
    },
}
</script>

<style scoped>


.newCommnent{
    padding : 20px 20px 0px 20px;
    height:auto;
    width:auto;
    margin: 1rem auto;
}
.form{
    border: solid 1px rgba(29, 77, 112);
    border-radius: 20px;
}
label {
    text-align : left !important;
}
textarea {
    margin: 20px 0px 20px 0px;
    height: 70px;
    width: calc(100% - 22px);
    padding: 10px;
    resize: none;
    overflow-y: scroll;
    border-radius:20px;
}
button {
    margin-top: 20px;
    padding: 5px;
    font-size: 1rem;
    color: white;
    background-color: rgba(29, 77, 112);
    border: none;
    border-radius: 10px;
    transition-duration: 0.2s;
    cursor: pointer;
    margin: auto;
}

#newComment-btn{
    margin: .8rem ;
    color:white;
}
.header-new-comment {
    margin: auto auto .1rem 1rem ;
    color: rgba(29, 77, 112);
    font-weight: 700;
    padding-top:.5rem;
}
textarea {
    width:100%;
    border :solid 2px  rgba(29, 77, 112);
    border-radius:20px;
}
input {
    margin-left: 1rem;
    border: none;
}
.info-C {
        font-size:12px;
        margin-bottom :1rem;
        padding: .5rem 0 0 .5rem;
    }

.alert-message{
      background-color: rgba(29, 77, 112);
      height:auto;
      width: auto;
      margin: auto ;
      color: white;
      text-align: center;
}
.alert-error-message{
      background-color: rgba(236, 14, 14, 0.301);
      height:auto;
      width: auto;
      margin: auto ;
      color: black;
      text-align: center;
}


.head-comment >h2{
    display: flex;
    justify-content: center;
    padding-left: .5rem;
    color: rgba(29, 77, 112);
    font-weight: 700;
    margin-top: 1rem;
}

.comments { 
    border :solid 2px rgba(29, 77, 112);
    width:auto;
    height: auto;
   border-radius:20px;
}
.comment{
     background-color: #f5f1eb ;
    width: auto;
    height: auto;
    margin :2rem;
    border: solid 1px rgba(29, 77, 112);
    border-radius: 20px;
}
.text-comment {
    padding: 0 0 .5rem .5rem;
    font-size: 20px;
}

#btn-sup-comment {
    margin:auto;
    width: fit-content;
    padding-bottom:.5rem;

}

@media screen and (max-width:680px) {

    .info-C {
        font-size:12px;
        margin-bottom :1rem;
    }
    .text-comment {
        line-height: 1%;
    }
    .btn-sup-comment {
        margin-top: 1rem;
    }

}
</style>
