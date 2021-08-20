<template>
    <div class="newComment">
        <div class="newComment-btn" @click.prevent="visible = true"> Votre Commentaire
        </div>
       
        <transition name="fade">
            <div class="overlay" v-if="visible">
                <div class="form-container">
                    <span class="newComment-btn formClose" @click.prevent="visible= false">Fermer</span>
                    <form class="formComment" @submit.prevent="publishComment">
                        
                        <editor 
                            :apiKey="key"
                            v-model="content"
                            :init="{
                            height: 500,
                            menubar: false,
                            forced_root_block : false,
                            force_br_newlines : true,
                            force_p_newlines : false,
                            
                            plugins: [
                                'advlist autolink lists link image charmap',
                                'searchreplace visualblocks code fullscreen',
                                'print preview anchor insertdatetime media',
                                'paste code help wordcount table'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic | \
                                alignleft aligncenter alignright | \
                                bullist numlist outdent indent | link image | print preview media fullpage | ' +
                                'forecolor backcolor emoticons |help',
                            menu: {
                            favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
                            },
                            menubar: 'favs file edit view insert format tools table help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
 
                            }"
                            >
                        </editor>
                        
                        <button id="newComment-btn" type="submit">Publier</button>
                        <div class="alert-message"  v-html="errorMessage"/>
                        <div class="alert-message"  v-html="message">
                        </div>
                       
                    </form> 
                </div>
            </div>
        </transition>
        <div class="comments" >
            <div class="comment" v-for="comment in comments" :key="comment.commentId">
                <div class="info-C">Commenté le :{{comment.createdAt | moment("DD  MM YYYY à HH:mm")}} Par : {{comment.firstname}} {{comment.surname}} 
                    <button class="btn-sup-comment" @click.prevent="deleteComment" v-if="comment.userId == users.userId || true" :key="comment.commentId">Supprimer</button>
                </div>
                <div class="comment-text">
                    {{comment.content}}
                </div>
            </div>
        </div>
    </div>   
</template>

<script>

import Editor from'@tinymce/tinymce-vue';
import comment from '@/api/comment';

export default {
        name: 'Comments',
        components: {
            editor : Editor
        },

        data() {
            return {
                comments: [],
                key : process.env.VUE_APP_TYNI,
                errorMessage: null,
                visible : false,
                message: null,
                content: "",
                users: "",
            }
        },
       mounted() {
            if(sessionStorage.vuex != undefined) {
            this.getAllComment();
            }
        },
        methods: {
                 async getAllComment() {
           try {
                const response = await comment.getComment();
                
               this.comments = response.data
               console.log(response.data)
                
                this.message = "Tous les commentaires !!"
                
               }catch (error) {
                this.errorMessage = "Something went wrong !!"
               console.log(error)
            }
       },
                async publishComment() { 

             try {
                 const response = await comment.newComment({
                    
                    content : this.content
            })
                
                console.log(response)
                this.message = "Votre commentaire a été publié !!";  
                location.reload();
                
            }catch (error){
                    this.errorMessage = "oppss!!";
                    console.log(error)
                }
        },
            deleteComment() {
        },
    },
}
</script>

<style >

.newCommnent{
    padding : 20px 20px 0px 20px;
    height:auto;
    width:auto;
    margin: 1rem auto;
}
.newComment-btn{
    cursor: pointer;
    color: green;
    padding-bottom: .5rem;
}
#newComment-btn{
    margin: .7rem auto;
}

input {
    margin-left: 1rem;
     border: none;
}
button {
    color: green;
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
.fade-enter-active, .fade-leave-active {
    transition : opacity .8s;
}
.fade-enter, .fade-leave-to {
    opacity : 0;
}
.comments { 
    border :solid 5px red;
    width:auto;
    height: auto;
}
.comment{
    position: relative;
    border: solid 1px rgba(4, 128, 31, 0.301);
    width: auto;
    height: auto;
    margin :2rem;
}
.comment-text {
    height: auto;
    width: auto;
}
.btn-sup-comment {
    position: absolute;
    right:0;
    top:2;
}
</style>
