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
                    :apiKey="key"
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
        <div class="alert-message"  v-html="errorMessage"/>
        <div class="alert-message"  v-html="message">
        </div>
    </div>
</template>

<script>

import Editor from '@tinymce/tinymce-vue';
import post from '@/api/post';

export default {

    name : "onePost",

    components: {
        editor: Editor
    },
    data() {
        return {
            key : process.env.VUE_APP_TYNI,
            contentModified : "",
            post: [],
            message: null,
            errorMessage: null,
            authorized: false,
            modify: false

        }
    },
    mounted(){
        if(sessionStorage.vuex != undefined)
        this.getOnePost();
    },
    methods: {
        async getOnePost(){
            try {
                const response = await  post.getOnePost();

                    this.post = response.data
                    console.log(response.data)
                    this.message ="!!"

            }catch (error) {
                this.errorMessage = "ooppss !!"
                console.log(error)
            }
        },
        modifyPost(){
            
        },
        deletePost() {
            
        },
    }
}

</script>

<style scoped>

.onePost{

    border: solid 1px rgba(4, 128, 31, 0.301);
    margin: 1rem auto;
    width: auto;
    height:auto;
}
</style>
