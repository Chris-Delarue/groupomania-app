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
                            <label for="title" class="newPost-btn" >Titre :</label>
                            <input type="text" name="title"  id="titlePost" v-model="title">
                        </div>
                        
                        <editor 
                            :apiKey="key"
                            v-model="content"
                           
                                :init="{
                                    height: 500,
                                    forced_root_block : false,
                                    force_br_newlines : true,
                                    force_p_newlines : false,  
                                    paste_as_text: true,  
                                    paste_data_images: true,
                                    language: 'fr_FR',
                                    entity_encoding : 'raw',
                    

                                    plugins: [
                                    'advlist autolink lists link  image charmap',
                                    'searchreplace visualblocks code fullscreen',
                                    'print preview anchor insertdatetime media',
                                    'paste code help wordcount table', 'emoticons'
                                    ],
                                    
                                    toolbar:
                                    'undo redo | formatselect | bold italic | \
                                    alignleft aligncenter alignright | \
                                    bullist numlist outdent indent image |print preview media fullpage | ' +
                                    'forecolor backcolor emoticons |help',
                                    menu: {
                                    favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
                                    },
                                    menubar: 'favs file edit view insert format tools table help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                             }"
                             >
                          
                        </editor>
                      
                        <div class="form-group">
                             <input type="file"  name="file" @change="onFileUpload">
                        </div>
            
                            <button id="send_btn" type="submit">Publier</button>
                        
                        <div class="alert-error-message"  v-html="errorMessage"/>
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
import post from '@/api/post';




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
                file: "",
                errorMessage: null,
                message: null,
                
            }
        },
        
        methods: {

            onFileUpload(event) {
            this.file = event.target.files[0]
            console.log(this.file)
            },
            async publishPost(e) { 
                e.preventDefaults
               
                if(this.content.length === 0) 
                {
                    this.errorMessage ="Vous ne pouvez pas envoyer de message vide !!"
                    setTimeout(() =>{
                        this.errorMessage=""
                    },2000)

                    
                }else {
                const formData = new FormData()

                formData.append('file', this.file)
                formData.append('title', this.title)
                formData.append('content', this.content)
                console.log(formData)
                post.newPost(formData)

                .then(response => {
                    
                console.log(response.data)

                this.message = "Votre post a été publié !!";  
                this.$router.go()/*push({name: "Home"}).catch(() =>{})*/
                })
                    
                .catch (error =>{
                    this.errorMessage = "oppss une erreur est survenue !!";
                    console.log(error)
                }) 
            }
        },
        

    }
}
</script>  

<style scoped>

.btn{
    width:  fit-content;
    height: fit-content;
}

.newPost{
    padding : 20px 20px 0px 20px;
    height:auto;
    width:auto;
    margin: 1rem auto;
}
.newPost-btn{
    cursor: pointer;
    color: rgb(29, 77, 112);
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
    background-color : rgba(29, 77, 112);
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
      background-color:  rgba(29, 77, 112);
      height:fit-content;
      width: fit-content;
      margin: auto ;
      color: white;
      text-align: center;
      padding:.7rem;
}
.alert-error-message{
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
.form{
    border: solid 5px;
}

</style>