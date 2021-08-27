
import httpClient from '../api/httpClient';
import store from '../store/index';

export default {
    getAllPost: ()=> {
        console.log(store.getters.token);
        return httpClient.get("/post");
    },
    getOnePost :(postId, data ) => {
        console.log(store.getters.token);
        return httpClient.get("/post/" + postId, data);
    },
    newPost :data => {
        console.log(store.getters.token);
        return httpClient.post("/post", data); 
    },
    modifyPost (postId, data) {
        console.log(store.getters.token);
        return httpClient.put("/post/" + postId, data);
    },
    deletePost : postId => {
        console.log(store.getters.token);
        return httpClient.delete("/post/" + postId);
    }
}
