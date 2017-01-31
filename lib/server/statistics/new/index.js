'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req) {
    var origin = req.ip;
    var ua = req.get('User-Agent');
    var body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    var id = body.id;
    return _db2.default.updateWithInsertFallback('statistics', { id: id }, _extends({
        origin: origin,
        ua: ua
    }, body));
};