<template>
    <div class="comments">
        <div class="comment">
            <form  @submit.prevent="newComment">
                <label for="new-comment">Votre commentaire : </label>
                <textarea name="newComment" id="new-comment" placeholder="Votre commentaire..." required></textarea>
                <button type="submit" id="send-comment">Envoyer</button>
            </form> 
            <h2 v-if="comment.length > 0">Commentaires : </h2>

            <div class="comment">
                <div class="comment" v-for="comment in comments" :key="comment.commentId">
                 <div class="info-C">Par {{comment.firstname}} {{comment.surname}} le {{dataFormat(comment.createdeAt)}}
                     <span @click.prevent="deleteComment(comment.commentId)" v-if="comment.userId == $user.userId" :key="comment.commentId">Supprimer</span>
                </div>
                {{comment.content}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
        name: 'Comments',

        data() {
            return {
                comments: []
            }
        },
        mounted() {
            this.getComment();
        },
        methods: {
            newComment() {
                
        },
            getComment() {
            
        },
            deleteComment() {
           
        },
            dataFormat(createdAt) {
                const date = new date(createdAt)
                return date.toLocateDateString(['fr-FR' , {day: '2-digit', month:'short', year: 'numeric', hour: '2-digit', minute: '2-digit'}
            ])
        }
    }
}
</script>

<style scoped>

.comments{
    height: 200px;
    width:auto;
    border: solid 1px red;
}
</style>
