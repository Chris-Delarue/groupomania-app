<template>
    <div class="posts" >
        <div>
            <div class="alert-message" v-html="errorMessage"/>
            <div class="alert-message" v-html="message"/>
        </div> 
        <div class="post" v-for="post in posts" :key="post.postId">
            <router-link class="router-link" :to="{ name: 'Post', params: {postId: post.postId}}">
            <div class="post-header">    
                <span class="info-P">Posté le : {{post.createdAt | moment("DD.MM.YYYY à HH:mm")}} par : {{post.firstname}} {{post.surname}}</span>
                    
            </div>
                <h2 class="post-title">{{post.title}}</h2>
            <div class="post-content" v-html="post.content"></div>
            <div class="post-btn">
                <span class="post-modify" v-if="$store.state.user.userId == post.userId || $store.state.user.isAdmin == true">Modifier</span>
                <span class="postComment" >Commenter</span>
            </div>
            </router-link>
        </div>
    </div>  
</template>

<script>

import post from "@/api/post";



export default {
    name : 'Posts',
    
    data() {
        return {
            
            posts : [],
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
    border: solid 3px rgba(4, 128, 31, 0.301);
    margin:auto auto 1rem auto;
   
}
.post{
    border: solid 1px rgba(4, 128, 31, 0.301);
    width: auto;
    height: auto;
    margin :2rem;
    padding: .5rem;
    background-color: #f5f1eb;
}
.alert-message{
    background-color: rgba(98, 245, 130, 0.301);
    height:auto;
    width: auto;
    margin: auto ;
    color: black;
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
    color: green;
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

.post-modify, .postComment{
   
    margin-top: 20px;
    padding: 5px;
    font-size: 1.1rem;
    color: white;
    background-color: green;
    border: none;
    border-radius: 10px;
    transition-duration: 0.2s;
    cursor: pointer;
    margin: .8rem;
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