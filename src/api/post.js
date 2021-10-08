
import httpClient from '../api/httpClient';
import store from '../store/index';

export default {
    getAllPost: ()=> {
        console.log(store.state.token);
        return httpClient.get("/post", {
            headers : {
                Authorization : `Bearer ${store.state.token}`
            }
        });
    },
    getOnePost :(postId, data) => {
        console.log(store.state.token);
        return httpClient.get("/post/" + postId, data, {
            headers : {
                Authorization : `Bearer ${store.state.token}`
            }
        });
    },
    newPost :data => {
        console.log(store.state.token);
        return httpClient.post("/post", data, {
            hearders : {
                Authorization : `Bearer ${store.state.token}`
                }
        }); 
        
    },
    modifyPost :(postId, data) =>{
        console.log(store.state.token);
        return httpClient.put("/post/" + postId, data, {
            hearders : {
                Authorization : `Bearer ${store.state.token}`
                }
        });
    },
    deletePost : postId => {
        console.log(store.state.token);
        return httpClient.delete("/post/" + postId,{
            hearders : {
                Authorization : `Bearer ${store.state.token}`
                }
        } );
    },
    getComment :postId=> {
        console.log(store.state.token);
        return httpClient.get("/post/" + postId, {
            hearders : {
                Authorization : `Bearer ${store.state.token}`
                }
            
        });
    },
   
    newComment :  (postId, data) =>{
        console.log(store.state.token);
        return httpClient.post("/post/" + postId , data, {
            hearders : {
                Authorization : `Bearer ${store.state.token}`
                }
        });
    },
   
    deleteComment : commentId => {
        console.log(store.state.token);
        return httpClient.delete("/post/comment/" + commentId, {
            hearders : {
                Authorization : `Bearer ${store.state.token}`
                }
        });
    }
};

