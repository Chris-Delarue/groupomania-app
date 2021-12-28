
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
            headers : {
                Authorization : `Bearer ${store.state.token}`,
                'Content-Type':'multipart/form-data'
                }
        }); 
        
    },
    modifyPost :(postId, data) =>{
        console.log(store.state.token);
        return httpClient.put("/post/" + postId, data, {
            headers : {
                Authorization : `Bearer ${store.state.token}`,
                'Content-Type':'multipart/form-data'
                }
        });
    },
    deletePost : postId => {
        console.log(store.state.token);
        return httpClient.delete("/post/" + postId,{
            headers : {
                Authorization : `Bearer ${store.state.token}`
                }
        } );
    },
    getComment :postId=> {
        console.log(store.state.token);
        return httpClient.get("/post/" + postId, {
            headers : {
                Authorization : `Bearer ${store.state.token}`
                }
            
        });
    },
   
    newComment :  (postId, data) =>{
        console.log(store.state.token);
        return httpClient.post("/post/" + postId , data, {
            headers : {
                Authorization : `Bearer ${store.state.token}`
                }
        });
    },
   
    deleteComment : commentId => {
        console.log(store.state.token);
        return httpClient.delete("/post/comment/" + commentId, {
            headers : {
                Authorization : `Bearer ${store.state.token}`
                }
        });
    }
};

