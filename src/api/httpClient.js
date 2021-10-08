import axios from 'axios';
import store from '../store/index';

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 3000,
    headers: {
        Accept: 'applcation/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.state.token}`
    }
 });

 
 export default httpClient;
