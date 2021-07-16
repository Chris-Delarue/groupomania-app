<template>
    <div class="posts">
        <article class="post" v-for="post in posts" :key="post.postId">
            <router-link :to="{ name: 'Post', params: {postId: post.postId}}">
                <div class="post-header">
                    <span class="info-P">Posté le {{dataFormat(post.createdAt)}} par {{post.firstname}} par {{post.surname}}</span>
                    <span class="modify-P" v-if="post.userId == $user.userId || $user.isAdmin == 1">Modifier</span>
                </div>
                <h2 class="post-title">{{post.title}}</h2>
                <div class="post-content" v-html="textlimit(post.content)"></div>
            </router-link>
         </article>       
    </div>
</template>

<script>

import axios from 'axios'


export default {
    name : 'Posts',
    data() {
        return {
            posts : [],
            visible : true
        }
    },

    mounted() {
      
        this.getAllPost();
    },
    methods : {
        getAllPost() {
            axios.get(`${this.$apiUrl}/post/`,
                {
                headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${this.$token}`
                }
            }
            )
            .then(res => {
            this.posts = res.data
            console.log(res.data)
            })
            .catch(error =>{
                console.log(error)

            })
        },
        textLimit(content) {
            let text = content;
            const maxLength = 400;
            if(text.length > maxLength) {
                return text.substring(0, maxLength - 3) +"..."
            }
        },
        dataFormat(createdAt) {
            const date = new date(createdAt)
            return date.toLocateDateString(['fr-FR' , {day: '2-digit', month:'short', year: 'numeric', hour: '2-digit', minute: '2-digit'}])
        }
    }
}

</script>


<style scoped>


.posts{
    height: 50px;
    width: 500px;
    border: solid 1px;
}
.post{
    width:100px;
    border: solid 1px;
}
.post-title{
    border :solid 1 px;
    width: 20px;
    height:20px;
}

</style>