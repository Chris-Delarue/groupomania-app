import httpClient from '../httpClient';

export default {

    signup(data) {
        return httpClient().post("/auth/signup", data);
    },
    login(data) {
        return httpClient().post("/auth/login", data);
    },
    deleteAccount(userId) {
        return httpClient().delete("/", + userId);
    }
}


