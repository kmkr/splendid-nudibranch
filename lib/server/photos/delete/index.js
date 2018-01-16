'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _s3Deleter = require('../s3/s3-deleter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (key) {
      return (0, _s3Deleter.deletePhoto)(key).then(function () {
            return _db2.default.delete('photos', { key: key });
      }).then(function () {
            return { key: key };
      });
};