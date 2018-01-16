'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = auth;
var WHITELIST = ['/stats'];
var ADMIN_KEY = process.env.SN_ADMIN_ACCESS_KEY;

function getKey(path) {
  var segments = path.split('/');
  var lastSegment = segments[segments.length - 1];

  if (lastSegment.match(/[\w\d]{4}-[\w\d]{4}/)) {
    return lastSegment;
  }
}

function auth(req, res, next) {
  if (req.method === 'GET') {
    return next();
  }

  if (WHITELIST.indexOf(req.path) > -1) {
    return next();
  }

  var key = getKey(req.path);
  var response = key ? { key: key } : {};

  if (!req.header('x-auth')) {
    res.status(400).json(response);
  }

  if (req.header('x-auth') === ADMIN_KEY) {
    return next();
  }

  res.status(403).end(response);
}