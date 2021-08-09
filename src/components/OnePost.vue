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
  
    methods: {
        getOnePost(){
            
        },
        deletePost() {
            
        },
        modifyPost() {
            
        },
    }
}

</script>

<style scoped>

.onePost{

    border: solid 1px;
    margin: 1rem auto;
    width: 100%;
    height:2rem;
}
</style>
