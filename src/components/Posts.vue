<template>
    <div class="posts" >
        <div>
            <div class="alert-message" v-html="errorMessage"/>
            <div class="alert-message" v-html="message"/>
        </div> 
        <div class="post" v-for="post in posts" :key="post.postId">
            <router-link :to="{ name: 'Post', params: {postId: post.postId}}">
            <div class="post-header">    
                <span class="info-P">Posté le : {{post.createdAt | moment("DD.MM.YYYY à HH:mm")}} par : {{post.firstname}} {{post.surname}}</span>
                    
            </div>
                <h2 class="post-title">{{post.title}}</h2>
            <div class="post-content">{{post.content}} </div>
            <div>
            <span class="post-modify" v-if="post.userId ">Modifier</span>
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
        
        if(sessionStorage.vuex != undefined) {
        this.allPost()
        }
    },
    
    methods : {
        async allPost() {
            
            try {
                const response = await post.getAllPost();

                this.posts = response.data
                console.log(response.data)
               
                this.message = "Voici tous les postes actualisés !!"

                }catch (error) {
                this.errorMessage = "Something went wrong !!"
                console.log(error)
            }
        }, 
    },
}
</script>
<style scoped>

.posts{
    width:auto;
    border: solid 1px rgba(4, 128, 31, 0.301);

}
.post{
  
    border: solid 1px rgba(4, 128, 31, 0.301);
    width: auto;
    height: auto;
    margin :2rem;
    padding: .5rem;
    
}
.alert-message{
    background-color: rgba(98, 245, 130, 0.301);
    height:auto;
    width: auto;
    margin: auto ;
    color: black;
    text-align: center;
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
}

@media screen and (max-width:680px) {

    .info-P {
        font-size: 13px;

    }
}

</style>