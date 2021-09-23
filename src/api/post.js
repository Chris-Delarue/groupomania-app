
import httpClient from '../api/httpClient';
import store from '../store/index';

export default {
    getAllPost: ()=> {
        console.log(store.getters.token);
        return httpClient.get("/post", {
            headers : {
                Authorization : `Bearer ${store.getters.token}`
            }
        });
    },
    getOnePost :(postId, data) => {
        console.log(store.getters.token);
        return httpClient.get("/post/" + postId, data, {
            headers : {
                Authorization : `Bearer ${store.getters.token}`
            }
        });
    },
    newPost :data => {
        console.log(store.getters.token);
        return httpClient.post("/post", data, {
            hearders : {
                Authorization : `Bearer ${store.getters.token}`
                }
        }); 
        
    },
    modifyPost :(postId, data) =>{
        console.log(store.getters.token);
        return httpClient.put("/post/" + postId, data);
    },
    deletePost : postId => {
        console.log(store.getters.token);
        return httpClient.delete("/post/" + postId);
    },
    getComment :postId=> {
        console.log(store.getters.token);
        return httpClient.get("/post/" + postId, {
            hearders : {
                Authorization : `Bearer ${store.getters.token}`
                }
            
        });
    },
   
    newComment :  (postId, data) =>{
        console.log(store.getters.token);
        return httpClient.post("/post/" + postId ,  data);
    },
   
    deleteComment : commentId => {
        console.log(store.getters.token);
        return httpClient.delete("/post/comment/" + commentId, {
            hearders : {
                Authorization : `Bearer ${store.getters.token}`
                }
        });
    }
};

