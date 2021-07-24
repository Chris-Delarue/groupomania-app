
import httpClient from '../api/httpClient';

export default {
    getAllPost() {
        return httpClient.get("/post");
    },
    getOnePost(postId) {
        return httpClient.get("/post", + postId);
    },
    newPost(data) {
        return httpClient.post("/post", data);
    },
    modifyPost(postId, data) {
        return httpClient.put("/post", + postId, data);
    },
    deletePost(postId) {
        return httpClient.delete("/post", + postId);
    }
}
