import httpClient from '../api/httpClient';
import store from '../store/index';

export default {

    signup : data =>  {
        return httpClient.post("/auth/signup", data);
    },
    login : data => {
        return httpClient.post("/auth/login", data);
    },
    deleteAccount : userId  =>  {
        console.log(store.getters.token);
        return httpClient.delete("/auth/" + userId);
    }
};

