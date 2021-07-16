<template>
    <div class="container">
        <div class="comments">
            <form  @submit.prevent= newComment()>
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
import axios from 'axios';

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
                const postId = parseInt(this.$route.params.postId);
                const userId = this.$user.userId;
                const content = document.getElementById('new-comment').value;

                axios.post(`${this.$apiURL}/post/${postId}/comment`,{
                userId,
                content
                },
                {
                    headers : {
                        'Content-type' : 'application/json',
                        'Authorization' : `Bearer ${this.$token}`
                    }
                }
            )
            .then(this.getComment());
        },
        getComment() {
            const postId = parseInt(this.$route.params.postId) ;
            axios.get(`${this.$apiURL}/post/${postId}/comments`,
            {
                headers : {
                        'Content-type' : 'application/json',
                        'Authorization' : `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => {
                this.comments = res.data
            });
        },
        deleteComment(commentId) {
            axios.delete(`${this.$apiUrl}/post/comment/${commentId}`, {
                headers: {
                    'Content-Type' : 'appication/json',
                    'Authorization' : `Bearer ${this.$token}`
                }
            }
            )
            .then(this.getComment());
        },
        dataFormat(createdAt) {
            const date = new date(createdAt)
            return date.toLocateDateString(['fr-FR' , {day: '2-digit', month:'short', year: 'numeric', hour: '2-digit', minute: '2-digit'}
            ])
        }
    }
}
</script>
