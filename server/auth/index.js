const WHITELIST = ['/stats'];
const ADMIN_KEY = process.env.SN_ADMIN_ACCESS_KEY;

export function auth(req, res, next) {
    if (req.method === 'GET') {
        return next();
    }

    if (WHITELIST.indexOf(req.path) > -1) {
        return next();
    }

    if (!req.header('x-auth')) {
        res.status(400).end();
    }

    if (req.header('x-auth') === ADMIN_KEY) {
        return next();
    }

    res.status(403).end();
}
