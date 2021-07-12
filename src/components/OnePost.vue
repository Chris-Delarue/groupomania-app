<template>
    <div class="onePost">
        <div class="post-wrapper" v-if="!modify">
            <h2 class="titlePost">{{this.post.title}}</h2>
            <div class="contentPost" v-html="this.post.content"></div>
        </div>

        <div class=" modify-wrapper" v-if="modify">
            <label for="modify-title" id="modify-title">Modifier le titre : </label>
            <input type="text" id="modify-text" v-model="this.post.title">

            <label for="modify-content">Modifier votre texte : </label>
            <editor
                    :initialValue="this.post.content"
                    v-model="contentModified"
                    apiKey="2j4glsouwhxyvl5e5dbfsbwx752e8b5aybqgsya7k63r2i05"
                    :init="{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap',
                        'searchreplace visualblocks code fullscreen',
                        'print preview anchor insertdatetime media',
                        'paste code help wordcount table'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic | \
                         alignleft aligncenter alignright | \
                        bullist numlist outdent indent | help'
                    }"
                >
                    <textarea  id="Modify-contentPost" v-model="this.post.content"></textarea>
            </editor>
        </div>

        <button v-if="authorized && !modify" @click.prevent="modify = true">Modifier</button>
        <button v-if="modify" @click.prevent="modify = false">Annuler</button>
        <button v-if="modify" @click.prevent="modifyPost">Envoyer les modifications</button>
        <button v-if="modify" class="delete-btn" @click.prevent="deletePost">Supprimer le post</button>
    </div>
</template>

<script>

import axios from 'axios';
import Editor from '@tinymce/tinymce-vue';

export default {

    name : "onePost",

    components: {
        editor: Editor
    },
    data() {
        return {
            contentModified : "",
            post: [],
            authorized: false,
            modify: false

        }
    },
    mounted() {
        this.getOnePost();
        },
    
    methods: {
        getOnePost(){
            const postId = this.$route.params.postId;

            axios.get(`${this.$apiUrl}/post/${postId}`,
            {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                }
            }) 
            .then(res =>{
                this.post = res.data[0];

                if(this.$user.$userId === this.post.userdId || this.$user.isAdmin == 1) {
                    this.authorize = true;
                }
                else{
                    this.authorized = false;
                }
            });
        },
        deletePost() {
            const postId = this.$route.params.postId;

            axios.delete(`${this.$apiUrl}/post/${postId}`,
            {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
            })
            .then(location.href ="/")
        },
        modifyPost() {
            const postId = this.$route.params.postId;
            const title = document.getElementById("modify-title").value;
            const content = this.contentModified;

            axios.put(`${this.$apiUrl}/post/${postId}`,
            {
                postId,
                title,
                content
            },
            {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }    
                }
            )
            .then(location.href ="/")
        },
    }
}

</script>
