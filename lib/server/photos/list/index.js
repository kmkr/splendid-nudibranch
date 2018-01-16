'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _constants = require('../constants');

var _photoDataFormatter = require('../photo-data-formatter');

var photoDataFormatter = _interopRequireWildcard(_photoDataFormatter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _db2.default.list('photos').then(function (photos) {
    return {
      base: _constants.base,
      photos: photoDataFormatter.dbToClient(photos)
    };
  });
};