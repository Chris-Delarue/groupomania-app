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
                            <label for="titlePost" class="titlePost" >Title :</label>
                            <input type="text" name="titlePost"  id="titlePost" v-model="title">
                        </div>
       
                        <editor 
                            apiKey = "2j4glsouwhxyvl5e5dbfsbwx752e8b5aybqgsya7k63r2i05"
                            v-model="content"
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
                                bullist numlist outdent indent | link image | print preview media fullpage | ' +
                                'forecolor backcolor emoticons |help',
                            menu: {
                            favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
                            },
                            menubar: 'favs file edit view insert format tools table help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
 
                            }"
                            >
                        </editor>
                        
                        <button id="newPost-btn" type="submit">Publier</button>
                        
                        <div class="alert-message"  v-html="errorMessage"/>
                        <div class="alert-message"  v-html="message">
                        </div>
                    </form>
                </div>
            </div>
        </transition>
    </div>   
</template>

<script>
import Editor from'@tinymce/tinymce-vue';
import post from '../api/post'


export default {
        name : 'NewPost',

        components : {
            editor: Editor
        },
        data() {
            return {
                visible : false,
                title: "",
                content: "",
                errorMessage: null,
                message: null
            }
        },
        methods: {
            async publishPost() {

                try {
                    const response = await post.newPost({
                        title: this.title,
                        content : this.content,
                    });
                    this.post = response.data;
                    let router = this.$router;
                        setTimeout(function() {
                     router.push("/post");
                    }, 2000);

                    this.message= "Votre post a été publié !!";
                    
                }catch (error) {
                    this.errorMessage = "oppss!!"
                }      
        },
    },

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
    padding-bottom: .5rem;
}
#newPost-btn{
    margin: .7rem auto;
}

.titlePost{

    padding-top : 1rem;
    color: green;
}
input {
    margin-left: 1rem;
     border: none;
    
}
button {
    color: green;
    border: none;
    
}
.alert-message{
      background-color: rgba(233, 77, 103, 0.301);
      height:30px;
      width: 40%;
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