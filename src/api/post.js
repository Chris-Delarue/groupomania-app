
import httpClient from '../api/httpClient';
import store from '../store/index';

export default {
    getAllPost: ()=> {
       
        return httpClient.get("/post", {
            headers : {
                Authorization : `Bearer ${store.state.token}`
            }
        });
    },
    getOnePost :(postId, data) => {
        
        return httpClient.get("/post/" + postId, data, {
            headers : {
                Authorization : `Bearer ${store.state.token}`
            }
        });
    },
    newPost :data => {
        
        return httpClient.post("/post", data, {
            headers : {
                Authorization : `Bearer ${store.state.token}`,
                'Content-Type':'multipart/form-data'
                }
        }); 
    },
    modifyPost :(postId, data) =>{
        
        return httpClient.put("/post/" + postId, data, {
            headers : {
                Authorization : `Bearer ${store.state.token}`,
                'Content-Type':'multipart/form-data'
                }
        });
    },
    deletePost : postId => {
        
        return httpClient.delete("/post/" + postId,{
            headers : {
                Authorization : `Bearer ${store.state.token}`
                }
        } );
    },
    getComment :postId=> {
       
        return httpClient.get("/post/" + postId, {
            headers : {
                Authorization : `Bearer ${store.state.token}`
                }
        });
    },
   
    newComment :  (postId, data) =>{
        
        return httpClient.post("/post/" + postId , data, {
            headers : {
                Authorization : `Bearer ${store.state.token}`
                }
        });
    },
   
    deleteComment : commentId => {
       
        return httpClient.delete("/post/comment/" + commentId, {
            headers : {
                Authorization : `Bearer ${store.state.token}`
                }
        });
    }
};

