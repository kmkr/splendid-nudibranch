'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.resize = resize;
exports.metadata = metadata;

var _gm = require('gm');

var _gm2 = _interopRequireDefault(_gm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resize(filePath, size, sizeLabel) {
  return new Promise(function (resolve, reject) {
    console.log('[resizer.js] Resizing file %s to %s', filePath, size);
    (0, _gm2.default)(filePath).resize(size, size).autoOrient().stream(function (err, stdout) {
      if (err) {
        return reject(err);
      }
      var buf = Buffer.from('');
      stdout.on('data', function (data) {
        buf = Buffer.concat([buf, data]);
      });
      stdout.on('end', function () {
        (0, _gm2.default)(buf).identify(function (_, value) {
          return resolve(_extends({
            sizeLabel: sizeLabel
          }, value.size, {
            buffer: buf
          }));
        });
      });
    });
  });
}

function parseDate(exifDate) {
  // 2016:04:09 21:11:45 to 2016-04-09 21:11:45
  return new Date(exifDate.replace(':', '-'));
}

function metadata(filePath) {
  return new Promise(function (resolve, reject) {
    (0, _gm2.default)(filePath).identify(function (err, value) {
      if (err) {
        return reject(err);
      }

      console.log(value);
      var exif = value['Profile-EXIF'];
      var dateTimeOrig = exif && exif['Date Time Original'];
      return resolve(_extends({}, value.size, {
        shot_at: dateTimeOrig ? parseDate(dateTimeOrig) : new Date()
      }));
    });
  });
}