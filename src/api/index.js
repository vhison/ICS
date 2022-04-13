// General Api to access data
import { httpClient } from "./HttpClient";

export default function Api(path, params, method, data) {
    // console.log("api > function :", path + params + method + JSON.stringify(data));
    return httpClient({   
    url: path,
    method: method,  
    params: params,
    data : data ? data : null,
    responseType: 'json'  
    })
    .then(function(response) {   
        console.log("HTTP CLIENT : success")
        // console.log("api > response : success",JSON.stringify(response)); 
        return response;
    })
    .catch(error => {
        console.log("HTTP CLIENT : error")
        // console.log("api > response : error",JSON.stringify(error)); 
        throw error;
    });
}