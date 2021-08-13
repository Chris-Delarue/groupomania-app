<template>
    <div class="posts" >
            <div class="post" v-for="post in posts" :key="post.postId">
            <div class="post-header">    
                    <span class="info-P">Posté le : {{post.createdAt}} par : {{post.firstname}} {{post.surname}}</span>
                </div>
                <h2 class="post-title">{{post.title}}</h2>
                <div class="post-content">{{post.content}}></div>
            </div>
        <div>
            <div class="alert-message" v-html="errorMessage"/>
            <div class="alert-message" v-html="message"/>
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
            errorMessage : null,
            message: null,
        }
    },
    mounted() {
        if(sessionStorage.vuex != undefined) {
            this.allFeed();
        }
    },
    
  methods : {
        async allFeed() {
            try {
                const response = await post.getAllPost();
                
                this.posts = response.data
                console.log(response.data)
                
                this.message = "Voici tous vos postes !!"

                }catch (error) {
                this.errorMessage = "Something went wrong !!"
                console.log(error)
            }
        },   
    },
            
        //textLimit(content) {
            //let text = content;
            //const maxLength = 400;
            //if(text.length > maxLength) {
                //return text.substring(0, maxLength - 3) + "...";
            //}
            //else {
               // return text;
            //}
        //},
        dataFormat(createdAt) {
            const date = new Date(createdAt)
            return date.toLocateDateString(['fr-FR' , {day: '2-digit', month:'short', year: 'numeric', hour: '2-digit', minute: '2-digit'}])
        }
}
</script>
<style >

.posts{
   
    width:auto;
    border: solid 1px rgba(4, 128, 31, 0.301);
}
.post{
    border: solid 1px rgba(4, 128, 31, 0.301);
    width: auto;
    height: auto;
    margin :2rem;
}
.alert-message{
    background-color: rgba(98, 245, 130, 0.301);
    height:30px;
    width: 37%;
    margin: auto ;
    color: black;
    text-align: center;
}
.post-header {
    width: auto;
    padding:.5rem;
}
.post-title{
    padding: .5rem;
}

</style>