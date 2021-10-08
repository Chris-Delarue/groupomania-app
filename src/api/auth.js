import httpClient from '../api/httpClient';


export default {

    signup : data =>  {
        return httpClient.post("/auth/signup", data);
    },
    login : data => {
        console.log(data)
        return httpClient.post("/auth/login", data);
    },
    deleteAccount : userId  =>  {
        return httpClient.delete("/auth/" + userId);
    }
};

