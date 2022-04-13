import axios from 'axios';
import { BASE_URL } from "./ApiConstants";

axios.interceptors.request.use(async (config) => {   
    console.log("api > AXIOS config" )    
    config.baseURL = BASE_URL;
    config.headers.post['Content-Type'] = 'multipart/form-data';
    return config;
},
function (error) {
    return Promise.reject(error);
});

export const httpClient = axios;