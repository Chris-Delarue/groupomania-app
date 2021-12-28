<template>
<div>
<NewPost />
    <div class="posts" >
        <div>
            <div class="alert-message" v-html="errorMessage"/>
            <div class="alert-message" v-html="message"/>
        </div> 
        <div class="post" v-for="post in posts" :key="post.postId">
            <router-link class="router-link" :to="{name:'Post',  params: {postId: post.postId}}">
            <div class="post-header">    
                <span class="info-P">Posté le : {{post.createdAt | moment("DD.MM.YYYY à HH:mm")}} par : {{post.firstname}} {{post.surname}}</span>
                    
            </div>
                <h2 class="post-title">{{post.title}}</h2>
            <div class="post-content" v-html="post.content">
            </div>
            <div class="image" v-if="post.imageurl">
                <img class="post-image" :src="post.imageurl" alt="image" />
            </div>
            <div class="post-btn">
                <span class="post-modify" v-if="$store.state.user.userId == post.userId || $store.state.user.isAdmin == true">Modifier</span>
                <span class="post-comment">Voir les commentaires</span>
            </div>
            </router-link>
        </div>
    </div>  
</div>
</template>

<script>

import post from "@/api/post";
import NewPost from "@/components/NewPost"


export default {
    name : 'Posts',
    components: {
    NewPost
    },
    
    data() {
        return {
            
            posts : [],
            post: [],
            visible: false,
            errorMessage : null,
            message: null,
        }
    },
    
    mounted() {
        
        this.allPost()
        
    },
    
    methods : {
        async allPost() {
            
                post.getAllPost()
                .then(response => {

                this.posts = response.data
                console.log(response.data)
                
                this.message = "Voici tous les postes actualisés !!"
              
                })
                .catch (error => {
                    console.log(error)
                    this.errorMessage = "Something went wrong !!"
            })
        }, 
    },
}
</script>
<style scoped>


.posts{
    width:80%;
    border: solid 3px rgb(29, 77, 112);
    margin:auto auto 1rem auto;
   
}
.post{
    border: solid 1px rgba(29, 77, 112);
    width: auto;
    height: auto;
    margin :2rem;
    padding: .5rem;
    background-color: #f5f1eb;
}
.alert-message{
    background-color: rgb(29, 77, 112);
    height:auto;
    width: auto;
    margin: auto ;
    color: white;
    text-align: center;
    font-size: 20px;
    font-weight:600;
}
.router-link{
    text-decoration: none;
}
.post-header {
    width: auto;
    height: auto;
    padding:.5rem;
    color: black;
}  
.post-title  {
    margin: 0;
    padding: .5rem;
    color: rgb(29, 77, 112);
    font-size: 20px;
    text-align: left;

}
.post-content  {
    overflow: hidden;
    hyphens :auto;
    word-wrap: break-word;
    width:auto;
    height: auto;
    padding: .5rem;
    color: black;
    font-size: 15px;
}
.image{
    width: 100%;
}
.post-image{
    width: 100%;
    border: solid red 2px;
}
img{
    object-fit: cover;
}

.post-btn{
    display:  flex;
}
.post-modify, .post-comment {
    font-size: 1.1rem;
    color: white;
    background-color: rgba(29, 77, 112);
    border: none;
    border-radius: 10px;
    transition-duration: 0.2s;
    cursor: pointer;
    margin: 1rem;
    text-align: center;
    padding: .5rem;
}

@media screen and (max-width:680px) {

.info-P {
        font-size: 13px;
    }
.post-btn {
    display: flex;
    flex-direction: column ;
    width: fit-content;
    margin: auto;
   
}
}

</style>