'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _idGenerator = require('../../../common/id-generator');

var idGenerator = _interopRequireWildcard(_idGenerator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (file) {
  var temp = '/tmp';
  var tempFile = temp + '/' + idGenerator.id() + '_' + file.originalname;
  return new Promise(function (resolve, reject) {
    console.log('[temp-file-writer] Writing %s', tempFile);
    _fs2.default.writeFile(tempFile, file.buffer, function (err) {
      if (err) {
        return reject(err);
      }

      return resolve({
        path: tempFile
      });
    });
  });
};