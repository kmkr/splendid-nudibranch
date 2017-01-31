'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _s3Wrapper = require('./s3-wrapper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('should assign extras', function (t) {
    t.is((0, _s3Wrapper.generateParams)({ foo: 'bar' }).foo, 'bar');
});