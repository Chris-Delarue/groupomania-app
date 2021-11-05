import axios from 'axios';


const httpClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 3000,
    headers: {
        Accept: 'applcation/json',
        'Content-Type': 'application/json',
        }
 });

 
 export default httpClient;
