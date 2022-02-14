<template>

    <div class="onePost" >
        <div class="modale">
            <ModalDeletePost :revele="revele" :displayModale="displayModale"/>
            <div class="post-wrapper"  v-if="!modify"  >
                <div class="post-header"  >    
                    <span  class="info-P">Posté le : {{ post.createdAt | moment("DD.MM.YYYY à HH:mm")}} par : {{post.firstname}} {{post.surname}}</span>      
                </div>
                <h2 class="titlePost">{{this.post.title}}</h2>
                <div class="contentPost" v-html="this.post.content"></div>
                <div class="image" v-if="post.imageurl">
                    <img class="post-image" :src="this.post.imageurl" alt="image" />
                </div>
            </div>
            <form class="formModify" @submit.prevent="modifyPost">
                <div class=" modify-wrapper" v-if="modify">
                    <label for="title" id="modify-title">Modifier le titre : </label>
                    <input type="text" id="modify-title" 
                    v-model="post.title">

                    <label for="content-modified"> Modifier votre texte : </label>
               
                    <editor
                        :initialValue ="this.post.content"
                        v-model="contentModified"
                        :apiKey="key"
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
                                'advlist autolink lists link image charmap',
                                'searchreplace visualblocks code fullscreen',
                                'print preview anchor insertdatetime media',
                                'paste code help wordcount table'
                            ],
                        toolbar:
                                'undo redo | formatselect | bold italic | \
                                alignleft aligncenter alignright | \
                                bullist numlist outdent indent  | print preview media fullpage | ' +
                                'forecolor backcolor emoticons |help',
                         menu: {
                            favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
                            },
                        menubar: 'favs file edit view insert format tools table help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
 
                        }"
                        >
                    </editor>
                       
                    <div class="form-group">
                        <input type="file"  name="file" @change="onFileUpload">
                    </div>
                </div>          
            
           
                <div class="btn">
                    <button v-if="authorized && !modify" @click.prevent="modify = true">Modifier</button>

                    <button v-if="modify" @click.prevent="annuler">Annuler</button>

                    <button v-if="modify" type="submit" >Envoyer les modifications</button>

                    <button v-if="modify" class="btn" v-on:click.prevent="displayModale">Supprimer le post</button>

                    <div class="alert-error-message"  v-html="errorMessage"/>
                    <div
                    class="alert-message"  v-html="message">
                   </div>
                </div>
            </form>
        </div> 
    
    </div>
    
</template>

<script>

import Editor from '@tinymce/tinymce-vue';
import post from '@/api/post';
import ModalDeletePost from '@/components/ModalDeletePost';
import store from '@/store/index'




export default {

    name : "OnePost",

    components: {
        editor: Editor,
        ModalDeletePost,
        
      
    },

    data() {
        return {
            key : process.env.VUE_APP_TYNI,
            contentModified : "",
            title:"",
            post:[],
            message: null,
            errorMessage: null,
            modify: false,
            authorized: false,
            revele: false,
            file:"",
            firstname: "", 
            surname:""
        }
    },
    
   
    mounted(){
        
        this.getPost()
    },
    

    methods: {

        

        async getPost(){
          
            const postId = this.$route.params.postId;
            
             post.getOnePost(`${postId}`, 
              
             )
            
            .then(response => {
                
                this.post = response.data[0]
                console.log(this.post)
                  if(store.state.user.userId == this.post.userId || store.state.user.isAdmin == true) {
                    this.authorized = true
                 }
                else {
                    this.authorized = false
                }
            })
            .catch (() =>{
                this.errorMessage = "ooppss !!"
                
            })
            
        },
        onFileUpload(event) {
            this.file = event.target.files[0]
          
        },

        async modifyPost(){
            
            if(this.contentModified.length === 0) {

                    this.errorMessage="Vous ne pouvez pas envoyer de message vide !!";
                    setTimeout(()=> {
                        this.errorMessage=""
                    },2000)  
            }else {

                const postId = this.$route.params.postId
                
                const formData = new FormData()

                formData.append('file', this.file)
                formData.append('title', this.post.title)
                formData.append('content', this.contentModified)
                console.log(this.file, this.post.title, this.contentModified)
                post.modifyPost(`${postId}`,formData )

                .then(() => {
                    
                    this.$router.push({ name: "Home"});
                })
                .catch(() => {
                    
                    this.errorMessage = "ooppss vous n'avez pas l'autorisation de modifier ce post et/ou le post est trop long!!"
                })
            } 
        },
        displayModale() {

            this.revele = !this.revele

        },
        annuler() {

            this.$router.push({ name : "Home"})
        }
    }
}

</script>

<style scoped>

.onePost{
    border: solid 2px rgba(29, 77, 112);
    margin: 0 auto 1rem auto;
    width: auto;
    height:auto;
    border-radius: 20px;
}
.post-wrapper {
    background-color: #f5f1eb;
    margin: 0 auto 2rem auto;
    padding: 2rem;
    width:  auto;
    height:auto;
    text-align: left;
    box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
}
.post-header {
    color:black;
    font-size: 12px;
    padding-bottom:.8rem;
}
.image{
    width: 100%;
}
.post-image{
    width: 100%;
    border: solid red 2px;
    border-radius:20px;
}
img{
    object-fit: cover;
}

.titlePost{
    margin: auto;
    padding-bottom: 1rem;
    color: rgba(29, 77, 112);
    font-size: 25px;
}
.contentPost{

    overflow: hidden;
    hyphens :auto;
    word-wrap: break-word;
    width:auto;
    height: auto;
    padding: 0;
    color: black;
    font-size: 20px;
}

.alert-message {
    background-color: rgba(29, 77, 112);
    height:auto;
    width: auto;
    margin: auto ;
    color: white;
    text-align: center;
}
.alert-error-message {
    background-color: rgba(236, 14, 14, 0.301);
    height:auto;
    width: auto;
    margin: auto ;
    color: black;
    white-space: normal;
    
}
.modale > button {
    margin-top: 20px;
    padding: 6px;
    font-size: 1.1rem;
    color: white;
    background-color: rgba(29, 77, 112);
    border: none;
    border-radius: 10px;
    transition-duration: 0.2s;
    cursor: pointer;
    margin: .8rem;
    width: fit-content;
}

.btn {
    
    display : flex;
    flex-flow: row wrap;

}
.btn > button {
    margin-top: 20px;
    padding: 6px;
    font-size: 1.1rem;
    color: white;
    background-color: rgba(29, 77, 112);
    border: none;
    border-radius: 10px;
    transition-duration: 0.2s;
    cursor: pointer;
    margin: .8rem;
    width: fit-content;

}

.modify-wrapper > label{
    
    font-size : .8rem;
    font-weight: bold;
    color : rgba(29, 77, 112);
    text-align :left;
    height: 1px;
    margin: -1px;
    padding:.8rem;
    width: auto;
}




</style>
