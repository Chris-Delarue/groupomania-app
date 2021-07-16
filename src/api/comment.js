import httpClient from '../httpClient';

export default {
    getComment() {
        return httpClient().get("/comment");
    },
   
    newComment(commentId, data) {
        return httpClient().post("/comment", + commentId, data);
    },
   
    deleteComment(commentId) {
        return httpClient().delete("/comment", + commentId);
    }
}

