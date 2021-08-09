<template>
    <div class="posts">
        <article class="post" v-for="post in posts" :key="post.postId">
            <router-link :to="{ name: 'Post', params: {postId: post.postId}}">
                <div class="post-header">
                    <span class="info-P">Posté le {{dataFormat(post.createdAt)}} par {{post.firstname}} par {{post.surname}}</span>
                    <span class="modify-P" v-if="post.userId == users.userId">Modifier</span>
                </div>
                <h2 class="post-title">{{post.title}}</h2>
                <div class="post-content" v-html="textlimit(post.content)"></div>
                
            </router-link>
            <div>
                <div class="alert-message" v-html="errorMessage"/>
                 <div class="alert-message" v-html="message"/>
            </div>
        </article> 
    </div>
    
</template>

<script>

import post from "../api/post";

export default {
    name : 'Posts',

    data: function () {
        return {
            posts : [],
            errorMessage : null,
            message: null,
            visible: false
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
                
                console.log(response.data);
                let router = this.$router;
                setTimeout(function() {
                router.push("/post");
                }, 2000);
                
            }catch (error) {
                this.errorMessage = "Something went wrong"
                console.log(error)
            }
        },   
    },
            
        textLimit(content) {
            let text = content;
            const maxLength = 400;
            if(text.length > maxLength) {
                return text.substring(0, maxLength - 3) +"..."
            }
            else {
                return text;
            }
        },
        dataFormat(createdAt) {
            const date = new Date(createdAt)
            return date.toLocateDateString(['fr-FR' , {day: '2-digit', month:'short', year: 'numeric', hour: '2-digit', minute: '2-digit'}])
        }
}


</script>


<style scoped>


.posts{
    height: 200px;
    width:auto;
    border: solid 1px red;
}
.post{
   
    border: solid 1px;
    height: 50px;
    width: 50px;
}
 .alert-message{
        background-color: rgba(233, 77, 103, 0.301);
        text-align: center;   
        height:40px;
        width:90%;
        margin: auto auto 1rem auto;
        color: black;
    }

</style>