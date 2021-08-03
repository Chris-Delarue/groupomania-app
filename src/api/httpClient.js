import axios from 'axios';
import store from '../store/index';

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 1000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    Authorization: `${store.state.token}`,
    }
 })

 export default httpClient;
