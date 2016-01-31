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
    get(url, additionalRequestOptions = {}) {
        const requestOptions = Object.assign({
            method: 'GET'
        }, additionalRequestOptions);
        return fetchWithHeaders(url, requestOptions);
    },
    getJSON(url, additionalRequestOptions = {}) {
        const requestOptions = Object.assign({}, additionalRequestOptions);
        requestOptions.headers = Object.assign({}, additionalRequestOptions.headers, {
            accept: 'application/json'
        });
        return this.get(url, requestOptions).then(response => response.json());
    },
    post(url, body, options = {}) {
        const requestOptions = Object.assign({
            method: 'POST',
            body
        }, options);

        return fetchWithHeaders(url, requestOptions, true);
    },
    delete(url, options = {}) {
        const requestOptions = Object.assign({
            method: 'DELETE'
        }, options);

        return fetchWithHeaders(url, requestOptions, true);
    },
    putJSON(url, body, options = {}) {
        const requestOptions = Object.assign({
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        }, options);

        return fetchWithHeaders(url, requestOptions, true);
    },
    postJSON(url, body, options = {}) {
        const requestOptions = Object.assign({}, options, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return this.post(url, body, requestOptions);
    }
};
