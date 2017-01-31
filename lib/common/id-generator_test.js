'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _idGenerator = require('./id-generator');

var idGenerator = _interopRequireWildcard(_idGenerator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('generation of id', function (t) {
    t.regex(idGenerator.id(), /[a-z0-9]{4}\-[a-z0-9]{4}/);
});