import snFetch from './index';

describe('gje-fetch', function () {
    function generateUrl() {
        return `/my/url/${(Math.random() * 10000).toString(32)}`;
    }

    let fetchSpy, promise;

    beforeEach(function () {
        window.fetch = fetchSpy = jasmine.createSpy();
    });

    function setupSpy(statusCode = 200) {
        promise = Promise.resolve({
            status: statusCode
        });
        fetchSpy.and.returnValue(promise);
    }

    describe('on success', function () {
        let url;

        beforeEach(function () {
            url = generateUrl();
            setupSpy();
        });

        it('should GET via fetch', function () {
            snFetch.get(url);

            expect(fetchSpy).toHaveBeenCalledWith(url, {
                headers: {
                    accept: 'application/json, application/xml'
                },
                credentials: 'same-origin',
                method: 'GET'
            });
        });

        it('should GET JSON', function () {
            snFetch.getJSON(url);

            expect(fetchSpy).toHaveBeenCalledWith(url, {
                headers: {
                    accept: 'application/json'
                },
                credentials: 'same-origin',
                method: 'GET'
            });
        });

        it('should override options', function () {
            snFetch.get(url, {
                headers: {
                    foo: 'bar'
                },
                credentials: 'none'
            });

            expect(fetchSpy).toHaveBeenCalledWith(url, {
                headers: {
                    accept: 'application/json, application/xml',
                    foo: 'bar'
                },
                credentials: 'none',
                method: 'GET'
            });
        });

        it('should POST via fetch', function () {
            const body = 'body';
            snFetch.post(url, body);

            expect(fetchSpy).toHaveBeenCalledWith(url, {
                headers: {
                    accept: 'application/json, application/xml'
                },
                body,
                credentials: 'same-origin',
                method: 'POST'
            });
        });

        it('should POST JSON', function () {
            const body = {
                arm: 'leg'
            };

            snFetch.postJSON(url, body);

            expect(fetchSpy).toHaveBeenCalledWith(url, {
                headers: {
                    'accept': 'application/json, application/xml',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'same-origin',
                method: 'POST'
            });
        });

        it('should add interceptor', function () {
            snFetch.addRequestInterceptors(() => ({
                waz: 'woz'
            }));

            snFetch.get(url);

            expect(fetchSpy).toHaveBeenCalledWith(url, {
                headers: {
                    accept: 'application/json, application/xml'
                },
                credentials: 'same-origin',
                waz: 'woz',
                method: 'GET'
            });
        });

        it('should return promise on GET', function (done) {
            snFetch.get(url).then(() => {
                done();
            });
        });

        it('should return promise on POST', function (done) {
            snFetch.post(url).then(() => {
                done();
            });
        });

    });

    describe('on failure', function () {
        let url;

        beforeEach(function () {
            url = generateUrl();
        });

        it('should reject on HTTP status above or equal 400', function (done) {
            setupSpy(400);

            snFetch.get(url).catch(() => {
                done();
            });

        });

    });

    describe('caching on success', function () {

        beforeEach(setupSpy);

        it('should only fetch once', function () {
            const url = generateUrl();
            snFetch.get(url, {}, {cache: true});
            snFetch.get(url, {}, {cache: true});

            expect(fetchSpy.calls.count()).toBe(1);
        });

        it('should return same promise', function () {
            const url = generateUrl();
            const p1 = snFetch.get(url, {}, {cache: true});
            const p2 = snFetch.get(url, {}, {cache: true});

            expect(p1).toBe(p2);
        });

        it('should fetch twice when header is added', function () {
            const url = generateUrl();
            snFetch.get(url, {}, {cache: true});
            snFetch.get(url, {
                headers: {
                    baz: 'boz'
                }
            }, {cache: true});

            expect(fetchSpy.calls.count()).toBe(2);
        });

        it('should fetch twice when header changes', function () {
            const url = generateUrl();
            snFetch.get(url, {}, {cache: true});
            snFetch.get(url, {
                headers: {
                    accept: 'text/plain'
                }
            }, {cache: true});

            expect(fetchSpy.calls.count()).toBe(2);
        });

        it('should fetch twice when request options change', function () {
            const url = generateUrl();
            snFetch.get(url, {}, {cache: true});
            snFetch.get(url, {
                credentials: 'none'
            }, {cache: true});

            expect(fetchSpy.calls.count()).toBe(2);
        });

        it('should fetch twice when interceptor changes request options', function () {
            const url = generateUrl();
            let counter = 0;
            snFetch.addRequestInterceptors(() => ({
                counter
            }));
            snFetch.get(url, {}, {cache: true});
            counter++;
            snFetch.get(url, {}, {cache: true});

            expect(fetchSpy.calls.count()).toBe(2);
        });

        it('should ignore specified header inequality', function () {
            const url = generateUrl();
            snFetch.addIgnoreHeaderInequalities('x-client-request-id');

            snFetch.get(url, {
                headers: {
                    'x-client-request-id': 1
                }
            }, {cache: true});
            snFetch.get(url, {
                headers: {
                    'x-client-request-id': 2
                }
            }, {cache: true});

            expect(fetchSpy.calls.count()).toBe(1);
        });

        it('should not ignore request option with same name as ignored header', function () {
            const url = generateUrl();
            snFetch.addIgnoreHeaderInequalities('credentials');

            snFetch.get(url, {credentials: 'same-origin'}, {cache: true});
            snFetch.get(url, {credentials: 'none'}, {cache: true});

            expect(fetchSpy.calls.count()).toBe(2);
        });

    });

    describe('caching on failure', function () {

        beforeEach(function () {
            setupSpy(400);
        });

        it('should not be cached', function (done) {
            const url = generateUrl();
            snFetch.get(url, {}, {cache: true}).catch(() => {
                snFetch.get(url, {}, {cache: true});
                expect(fetchSpy.calls.count()).toBe(2);
                done();
            });
        });

    });

});