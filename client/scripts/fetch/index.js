export default {
    addRequestInterceptors: function(e) {
        e.contructor !== Array && (e = [e]), l.push.apply(l, r(e))
    },
    addIgnoreHeaderInequalities: function(e) {
        e.contructor !== Array && (e = [e]), c.push.apply(c, r(e))
    },
    get: function(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
        n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
        r = Object.assign({
            method: "GET"
        }, t);
        return s(e, r, n)
    },
    getJSON: function(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
        n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
        r = Object.assign({}, t);
        return r.headers = Object.assign({}, t.headers, {
            accept: "application/json"
        }), this.get(e, r, n).then(function(e) {
            return e.json()
        })
    },
    post: function(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
        r = Object.assign({
            method: "POST",
            body: t
        }, n);
        return s(e, r)
    },
    postJSON: function(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
        r = Object.assign({}, n, {
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(t)
        });
        return this.post(e, t, r)
    }
};
