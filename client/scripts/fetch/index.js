function fetchWithHeaders(url, additionalRequestOptions = {}, credentials = false) {
    const requestOptions = {
        headers: Object.assign({
            accept: 'application/json'
        }, additionalRequestOptions.headers || {})
    };

    if (credentials) {
        requestOptions.credentials = 'same-origin';
    }

    delete additionalRequestOptions.headers;

    Object.assign(requestOptions, additionalRequestOptions);

    return fetch(url, requestOptions).then(response => {
        if (response.status >= 400) {
            return Promise.reject(new Error(response.statusText));
        }

        return response;
    });
}

export default {
    get(url, requestOptions = {}) {
        return fetchWithHeaders(url, Object.assign({
            method: 'GET'
        }, requestOptions));
    },
    post(url, body, requestOptions = {}) {
        return fetchWithHeaders(url, Object.assign({
            method: 'POST',
            body
        }, requestOptions), true);
    },
    delete(url, requestOptions = {}) {
        return fetchWithHeaders(url, Object.assign({
            method: 'DELETE'
        }, requestOptions), true);
    },
    putJSON(url, body, additionalRequestOptions = {}) {
        const requestOptions = Object.assign({
            method: 'PUT',
            body: JSON.stringify(body)
        }, additionalRequestOptions);

        requestOptions.headers = Object.assign({}, additionalRequestOptions.headers, {
            'content-type': 'application/json'
        });

        return fetchWithHeaders(url, requestOptions, true);
    },
    postJSON(url, body, additionalRequestOptions = {}) {
        const requestOptions = Object.assign({}, additionalRequestOptions, {
            body: JSON.stringify(body)
        });

        requestOptions.headers = Object.assign({}, additionalRequestOptions.headers, {
            'content-type': 'application/json'
        });

        return this.post(url, body, requestOptions);
    }
};
