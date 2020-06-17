class HttpService{
    ajax(method, url, data, headers){

        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});
        const urlPath = 'http://localhost:3001' + url;

        return fetch(urlPath, {
            method: method,
            mode: 'cors',
            headers: fetchHeaders,
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).catch(error =>{
            console.error('There has been a problem with the fetch operation:', error);
        })
    }
}

export const httpService = new HttpService();