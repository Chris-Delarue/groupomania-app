<template>
    <div class="newPost">
        <div class="newpost-btn" @click.prevent="visible = true">Créer un nouveau post
        </div>
        <transition name="fade">
            <div class="overlay" v-if="visible">
                <div class="form-container">
                    <span class="formClose" @click.prevent="visible= false">Fermer</span>
                    <form class="formPost" @submit.prevent="publishPost">
                        <div>
                            <label for="titlePost">Title:</label>
                            <input type="text" name="titlePost"  id="titlePost" v-model="title">
                        </div>
       
                         <editor
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
                            <textarea name="content"  id="contentPost" v-model="content" placeholder="Un peu d'écriture..."></textarea>

                        </editor>

                        <button type="submit">Publier</button>
                    </form>
                </div>
            </div>
        </transition>
    </div>   
</template>

<script>
import Editor from'@tinymce/tinymce-vue';
import axios from 'axios'

export default {
        name : 'NewPost',

        components : {
            editor: Editor
        },
        data() {
            return {
                visible : false,
                content: "",
            }
        },
        methods: {
                publishPost(){

                const title = document.getElementById("titlePost").Value
                const content = this.content;

                console.log(content)

                axios.post(`${this.$apiUrl}/post/`,
                {
                    userId : this.$user.userId,
                    title,
                    content
                },
                {
                    hearders: {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${this.$token}`
                    }
                }
            )
            .then(this.visible = false)
            .then(this.$root.$emit('Posts'));
        }
    }
}

</script>   