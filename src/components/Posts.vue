<template>
    <div class="posts" >
        <div>
            <div class="alert-message" v-html="errorMessage"/>
            <div class="alert-message" v-html="message"/>
        </div> 
        <div class="post" v-for="post in posts" :key="post.postId">
            <div class="post-header">    
                    <span class="info-P">Posté le : {{post.createdAt | moment("DD  MM YYYY à HH:mm")}} par : {{post.firstname}} {{post.surname}}</span>
                    <span class="post-modify" v-if="post.userId === users.userId || true">Modifier</span>
            </div>
                <h2 class="post-title">{{post.title}}</h2>
            <div class="post-content">{{post.content}} </div>
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
            users: "",
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
<style >

.posts{
    width:auto;
    border: solid 1px rgba(4, 128, 31, 0.301);
}
.post{
    position:relative;
    border: solid 1px rgba(4, 128, 31, 0.301);
    width: auto;
    height: auto;
    margin :2rem;
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
}
.post-title,  .post-content{
    padding: .5rem;
}

.post-modify {
    position: absolute ;
    padding: .3rem;
    margin: .3rem;
    left:10;
    right:0;
    top:5;
    bottom:0;
    height: fit-content;
    width: fit-content;
    border: solid 1px rgba(4, 128, 31, 0.301);
    color : green;
    
}


</style>