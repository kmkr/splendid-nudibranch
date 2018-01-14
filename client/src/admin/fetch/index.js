import 'whatwg-fetch';

const interceptors = [];

function fetchWithHeaders(url, additionalRequestOptions = {}) {
    const headers = {
        accept: 'application/json',
        ...(additionalRequestOptions.headers || {}),
        ...interceptors.reduce((a, b) => (
            {
                ...a(),
                ...b()
            }
        ), () => {})
    };

    delete additionalRequestOptions.headers;

    return fetch(url, {headers, ...additionalRequestOptions})
        .then(response => {
            if (response.status >= 400) {
                return Promise.reject(response);
            }

            return response;
        });
}

export default {
    addHeaderRequestInterceptor(interceptor) {
        interceptors.push(interceptor);
    },
    get(url, requestOptions = {}) {
        return fetchWithHeaders(url, {method: 'GET', ...requestOptions});
    },
    post(url, body, requestOptions = {}) {
        return fetchWithHeaders(url, {method: 'POST', body, ...requestOptions}, true);
    },
    delete(url, requestOptions = {}) {
        return fetchWithHeaders(url, {method: 'DELETE', ...requestOptions}, true);
    },
    putJSON(url, body, additionalRequestOptions = {}) {
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {},
            ...additionalRequestOptions
        };

        requestOptions.headers['content-type'] = 'application/json';

        return fetchWithHeaders(url, requestOptions, true);
    },
    postJSON(url, body, additionalRequestOptions = {}) {
        const requestOptions = {
            body: JSON.stringify(body),
            headers: {},
            ...additionalRequestOptions
        };

        requestOptions.headers['content-type'] = 'application/json';

        return this.post(url, body, requestOptions);
    }
};
