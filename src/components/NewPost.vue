<template>
    <div class="newPost">
        <div class="newPost-btn" @click.prevent="visible = true">Créer un nouveau post
        </div>
       
        <transition name="fade">
            <div class="overlay" v-if="visible">
                <div class="form-container">
                    <span class="newPost-btn formClose" @click.prevent="visible= false">Fermer</span>
                    <form class="formPost" @submit.prevent="publishPost">
                        <div>
                            <label for="titlePost" class="newPost-btn" >Titre :</label>
                            <input type="text" name="titlePost"  id="titlePost" v-model="title">
                        </div>

                        <editor 
                            :apiKey="key"
                            v-model="content"
                            :init="{
                            entity_encoding : 'raw',
                            height:500,
                            paste_as_text: true,
                            forced_root_block : '',
                            force_br_newlines : true,
                            force_p_newlines : false,
                            language :'fr_FR',
                            
                            plugins: [
                                'advlist autolink lists link image charmap',
                                'searchreplace visualblocks code fullscreen',
                                'print preview anchor insertdatetime media',
                                'paste code help wordcount table'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic | \
                                alignleft aligncenter alignright | \
                                bullist numlist outdent indent | print preview media fullpage | ' +
                                'forecolor backcolor emoticons |help',
                            menu: {
                            favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
                            },
                            menubar: 'favs file edit view insert format tools table help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
 
                            }"
                            >

                        </editor>
                        
                        <button id="send_btn" type="submit">Publier</button>
                        
                        <div class="alert-message"  v-html="errorMessage"/>
                        <div class="alert-error-message"  v-html="message">
                        </div>
                    </form>
                </div>
            </div>
        </transition>
    </div>   
</template>

<script>
import Editor from'@tinymce/tinymce-vue';
import post from '../api/post';




export default {
        name : 'NewPost',

        components : {
            editor: Editor
        },
        data() {
            return {

                key : process.env.VUE_APP_TYNI,
                visible : false,
                title: "",
                content: "",
                errorMessage: null,
                message: null,
            }
        },
        
        methods: {
        
            async publishPost() { 

            if(this.content.length === 0) 
           {
                    this.errorMessage ="Vous ne pouvez pas envoyer de message vide !!"
                    setTimeout(() =>{
                        this.errorMessage=""
                    },2000)
            }else {

                post.newPost({
                    title:      this.title,
                    content :   this.content
                })
                .then(response => {
                console.log(response.data)

                this.message = "Votre post a été publié !!";  
                this.$router.go()
                
                })        
                .catch (error =>{
                    this.errorMessage = "oppss une erreur est survenue !!";
                    console.log(error)
                })
            }
        }   
    }
}
</script>  

<style scoped>

.newPost{
    padding : 20px 20px 0px 20px;
    height:auto;
    width:auto;
    margin: 1rem auto;
}
.newPost-btn{
    cursor: pointer;
    color: green;
    font-size: 18px;
    font-weight: 700;
    padding-bottom: .5rem;
    width: fit-content;
}

#titlePost {
    margin-left: 2rem;
}
button  {
    cursor: pointer;
    color: white;
    font-size: 18px;
    margin: .8rem auto;
    width: fit-content;
    background-color : green;
    border-radius: 10px;
    border: none;

}

#newPostContent {
    height:200px;
    width: calc(100% - 20px);
    padding: 10px;
    resize: none;
    overflow-y: scroll;
    border: solid 1px red;
}

.alert-message{
      background-color: rgba(98, 245, 130, 0.301);
      height:fit-content;
      width: fit-content;
      margin: auto ;
      color: black;
      text-align: center;
}
.alert-message{
      background-color: rgba(236, 14, 14, 0.301);
      height:fit-content;
      width: fit-content;
      margin: auto ;
      color: black;
      text-align: center;
}

.fade-enter-active, .fade-leave-active {
    transition : opacity .8s;
}
.fade-enter, .fade-leave-to {
    opacity : 0;
}

</style>