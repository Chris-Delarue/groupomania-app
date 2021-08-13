import httpClient from '../api/httpClient';
import store from '../store/index';

export default {
    getComment :()=> {
        console.log(store.getters.token);
        return httpClient.get("/comment");
    },
   
    newComment :(commentId, data) =>{
        console.log(store.getters.token);
        return httpClient.post("/comment" + commentId, data);
    },
   
    deleteComment :commentId => {
        console.log(store.getters.token);
        return httpClient.delete("/comment" + commentId);
    }
}
