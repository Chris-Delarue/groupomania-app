<template>
    <div  class="newComment">
        <form @submit.prevent="publishComment">
            <label for="new-comment">Rédiger un commentaire :</label>
            <textarea name="newComment" id="new-comment" placeholder="Rédiger votre commentaire..." required></textarea>
            <button type="submit" id="newComment-btn">Publier</button>
        </form>
        <div class="head-comment">
        <h2 v-if="comments.length > 0" >Commentaires :</h2>
       </div>
        <div class="comments" >
            <div  class="comment" v-for="comment in comments" :key="comment.commentId">
                <div class="info-C">Commenté le : {{comment.createdAt | moment("DD  MM YYYY à HH:mm")}} Par : {{comment.firstname}} {{comment.surname}}  
                    <button class="btn-sup-comment" @click.prevent="deleteComment(comment.commentId)" v-if="$store.state.user.userId == comment.userId">Supprimer</button>
                </div>
                {{comment.content}}
            </div>
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
            if(sessionStorage != undefined) {
            this.getAllComment();
            }
        },
        methods: { 
            
                async publishComment() { 

                    const postId = parseInt(this.$route.params.postId)
                    const userId = this.$store.state.user.userId
                    const content = document.getElementById('new-comment').value;
                    
                    console.log(postId)
                    post.newComment(`${postId}/comment/`,{

                        postId,
                        content,
                        userId
                        })

                    .then(response => {

                        console.log(response.data)
                        this.message = "Votre commentaire a été publié !!";  
                        location.reload();
                    })
                        .catch (error=> {
                        this.errorMessage = "oppss!!";
                        console.log(error)
                    })
                    .then(this.getAllComment())
            },
                async getAllComment() {

                   const postId = parseInt(this.$route.params.postId)

                    post.getComment(`${postId}/comment/`)

                .then(response => {

                this.comments = response.data
                console.log(response.data)
            })
               .catch (error => {
                this.errorMessage = "Something went wrong !!"
                console.log(error)
            })
        },
               
            async deleteComment(commentId) {

                
            if(confirm("Êtes-vous sûr de vouloir supprimer votre commentaire ?")){

                post.deleteComment(`${commentId}`,)

                .then(() => {

                this.message = "Nous avons supprimer votre commentaire !!" 
                this.$router.push({name: "Home"})
                    
                })
               .catch (error => {
                this.errorMessage = "Something went wrong !!"
               console.log(error)
                })
            }
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
}
button {
    margin-top: 20px;
    padding: 5px;
    font-size: 1rem;
    color: white;
    background-color: green;
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
input {
    margin-left: 1rem;
    border: none;
}
button {
    background-color: green;
    color: white;
    border: none;
}
.alert-message{
      background-color: rgba(98, 245, 130, 0.301);
      height:auto;
      width: auto;
      margin: auto ;
      color: black;
      text-align: center;
}
.head-comment >h2{
    display: flex;
    justify-content: center;
}

.comments { 
    border :solid 2px rgba(4, 128, 31, 0.301);
    width:auto;
    height: auto;
}
.comment{
    position: relative;
    width: auto;
    height: auto;
    margin :2rem;
}
.comment-text {
    height: auto;
    width: auto;
}
.btn-sup-comment {
    float: right;
}

@media screen and (max-width:680px) {

    .info-C {
        font-size:12px;
    }
}
</style>
