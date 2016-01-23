const requestInterceptors = [];
const ignoreHeaderInequality = [];
const cache = [];

function objectKeyEquals(o1, o2, ignoredKeys = []) {
    if (typeof o1 !== 'object' || typeof o2 !== 'object' ||
        o1 === null || o2 === null ||
        Object.keys(o1).length !== Object.keys(o2).length) {

        return false;
    }

    return Object.keys(o1).every(key => {
        if (typeof o1[key] === 'object' && typeof o2[key] === 'object') {
            return true;
        } else {
            return ignoredKeys.indexOf(key) > -1 || o1[key] === o2[key];
        }
    });
}

function getFromCache(url, requestOptions) {
    const cached = cache.filter(instance => {
        return instance.url === url &&
            objectKeyEquals(instance.requestOptions.headers, requestOptions.headers, ignoreHeaderInequality) &&
            objectKeyEquals(instance.requestOptions, requestOptions);
    });
    return cached[0];
}

function removeFromCache(url, requestOptions) {
    const cached = getFromCache(url, requestOptions);
    if (cached) {
        cache.splice(cache.indexOf(cached), 1);
    }
}

function fetchWithHeaders(url, additionalRequestOptions = {}, options = {}) {
    const requestOptions = {
        headers: Object.assign({
            accept: 'application/json, application/xml'
        }, additionalRequestOptions.headers || {}),
        credentials: 'same-origin'
    };

    delete additionalRequestOptions.headers;

    Object.assign(requestOptions, additionalRequestOptions);

    requestInterceptors.forEach(requestInterceptor => {
        Object.assign(requestOptions, requestInterceptor(requestOptions));
    });

    const cached = options.cache && getFromCache(url, requestOptions);
    if (cached) {
        return cached.promise;
    }
    const promise = fetch(url, requestOptions).then(response => {
        if (response.status >= 400) {
            removeFromCache(url, requestOptions);
            return Promise.reject(new Error(response.statusText));
        }

        return response;
    });

    if (options.cache) {
        cache.push({
            url,
            requestOptions,
            promise
        });
    }

    return promise;
}

export default {
    addRequestInterceptors(interceptors) {
        if (interceptors.contructor !== Array) {
            interceptors = [interceptors];
        }
        requestInterceptors.push(...interceptors);
    },
    addIgnoreHeaderInequalities(headerNames) {
        if (headerNames.contructor !== Array) {
            headerNames = [headerNames];
        }
        ignoreHeaderInequality.push(...headerNames);
    },
    get(url, additionalRequestOptions = {}, options = {}) {
        const requestOptions = Object.assign({
            method: 'GET'
        }, additionalRequestOptions);
        return fetchWithHeaders(url, requestOptions, options);
    },
    getJSON(url, additionalRequestOptions = {}, options = {}) {
        const requestOptions = Object.assign({}, additionalRequestOptions);
        requestOptions.headers = Object.assign({}, additionalRequestOptions.headers, {
            accept: 'application/json'
        });
        return this.get(url, requestOptions, options).then(response => response.json());
    },
    post(url, body, options = {}) {
        const requestOptions = Object.assign({
            method: 'POST',
            body
        }, options);

        return fetchWithHeaders(url, requestOptions);
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
