<template>
    <div class="onePost" >
        <div class="logo" >
        <img src="../assets/images/icon-above-font.png" alt="Logo Groupomania">
          </div>
         
        <div class="post-wrapper"  v-if="!modify">
           
            <h2 class="titlePost">{{this.post.title}}</h2>
            <div class="contentPost" v-html="this.post.content"></div>
        </div>

        <div class=" modify-wrapper" v-if="modify">
            <label for="modify-title" class="modify-title">Modifier le titre : </label>
            <input type="text" id="modify-title" v-model="post.title">

            <label for="content-modified"> Modifier votre texte : </label>
            <editor
                    :initialValue="this.post.content"
                    v-model="contentModified"
                    :apiKey="key"
                    :init="{
                    height: 500,
                    menubar: false,
                    forced_root_block : false,
                    force_br_newlines : true,
                    force_p_newlines : false,    

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

    name : "OnePost",

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
            modify: false,
            userId:"",
            isAdmin:""
           
        }
    },

     mounted(){

        if(sessionStorage.vuex != undefined)
        this.getOnePost();
    },

    methods: {
        async getOnePost(){

            const postId = this.$route.params.postId
            
            try {
                const response = await post.getOnePost(`${postId}`)

                    this.post = response.data[0]
                    console.log(response.data)

                    this.message ="";

                    if( this.userId === this.post.userId || this.isAdmin == 0) {
                        this.authorized = true;
                    }else {
                        this.authorized = false;
                    }

            }catch (error) {
                this.errorMessage = "ooppss !!"
                console.log(error)
            }
        
    },
        async modifyPost(){

            if(this.contentModified.length === 0) {
                    alert(
                        "Vous ne pouvez pas envoyer de message vide !!"
                    )
            }else {

                const postId = this.$route.params.postId
                const title = document.querySelector('#modify-title').value
                const content = this.contentModified
                

            try {
                const response = await post.modifyPost(`${postId}`,{
                    
                 postId,
                 title,
                 content
                   
                })
                console.log(response.data)
                 let router = this.$router;
                setTimeout(function () {
                router.push("/");
                }, 2000) 
                location.reload();
            
            } catch (error) {
                console.log(error)
                this.errorMessage = "ooppss vous n'avez pas l'autorisation de modifier ce post !!"
            }
        }
    },
        deletePost() {
            
    },
    }
}

</script>

<style >

img{
  width: 100%;
  height:100%;
  border-radius: 100px;
}
.logo{
  width: 30%;
  height:30%;
  margin:  3rem auto;
  border: solid 2px green;
  border-radius : 100px;
}

.onePost{

    border: solid 1px rgba(4, 128, 31, 0.301);
    margin: 1rem auto;
    width: auto;
    height:auto;
}
.post-wrapper {
    margin: 50px auto 30px auto;
    padding: 30px;
    width: auto;
    height:auto;
    text-align: left;
    box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
    border-bottom: solid red 5px;

}
.titlePost{
  
    margin: auto;
    padding: 0;
    color: green;
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
    font-size: 15px;
}
.alert-message {
    background-color: rgba(98, 245, 130, 0.301);
    height:auto;
    width: auto;
    margin: auto ;
    color: black;
    text-align: center;
}
.onePost button {
    margin-top: 20px;
    padding: 6px;
    font-size: 1.1rem;
    color: white;
    background-color: green;
    border: none;
    border-radius: 10px;
    transition-duration: 0.2s;
    cursor: pointer;
    margin: .8rem;

}
#Modify-contentPost{
    margin-top :20px;
    height: 200px;
    width: calc(100%-22px);
    padding: 10px;
    resize: none;
    overflow-y: scroll;
}

.modify-wrapper > label{
    font-size : .8rem;
    font-weight: bold;
    color : green;
    text-align :left;
    height: 1px;
    margin: -1px;
    padding:.8rem;
    width: auto;
}
</style>
