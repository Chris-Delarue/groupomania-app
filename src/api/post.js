
import httpClient from '../api/httpClient';
import store from '../store/index'

export default {
    getAllPost: () => {
        console.log(store.getters.token);
        return httpClient.get("/post");
    },
    getOnePost :postId => {
        return httpClient.get("/post/" + postId);
    },
    newPost :data => {
        console.log(store.getters.token);
        return httpClient.post("/post", data);
        
    },
    modifyPost (postId, data) {
        return httpClient.put("/post/" + postId, data);
    },
    deletePost : postId => {
        return httpClient.delete("/post/" + postId);
    }
}
