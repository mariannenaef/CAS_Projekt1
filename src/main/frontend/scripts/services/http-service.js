class HttpService{
    ajax(method, url, data, headers){

        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});
        const urlPath = 'http://localhost:3002' + url;

        return fetch(urlPath, {
            method: method,
            mode: 'cors',
            headers: fetchHeaders,
            body: JSON.stringify(data)
        }).then(response => {
            if(method === 'PUT'){
                return response.status;
            }else{
                return response.json();
            }
        }).catch(error =>{
            console.error(`There has been a problem with the fetch operation ${method}: ${error}`);
        });
    }
}

export const httpService = new HttpService();