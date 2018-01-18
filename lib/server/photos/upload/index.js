'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _idGenerator = require('../../id-generator');

var idGenerator = _interopRequireWildcard(_idGenerator);

var _s3Uploader = require('../s3/s3-uploader');

var _s3Uploader2 = _interopRequireDefault(_s3Uploader);

var _gm = require('./gm');

var _tempFileWriter = require('./temp-file-writer');

var _tempFileWriter2 = _interopRequireDefault(_tempFileWriter);

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _constants = require('../constants');

var _constants2 = require('../../../common/constants');

var _photoDataFormatter = require('../photo-data-formatter');

var photoDataFormatter = _interopRequireWildcard(_photoDataFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function resizeToMultiple(path) {
  return _constants2.resizeTo.map(function (r) {
    return (0, _gm.resize)(path, r.width, r.name);
  });
}

function upload(id, file, resizedResults) {
  var mimetype = file.mimetype;

  function upl(prefix, buffer) {
    var name = id + '/' + prefix + '_' + file.originalname;
    return _s3Uploader2.default.upload(buffer, name, mimetype);
  }

  return _constants2.resizeTo.map(function (r, index) {
    return upl(r.shortName, resizedResults[index].buffer);
  });
}

function insertToDb(id, file, additionalData) {
  var photo = _extends({
    base: _constants.base,
    key: id,
    name: file.originalname
  }, additionalData);

  console.log('Inserting photo:');
  console.log(photo);
  return _db2.default.insert('photos', photo).then(function () {
    return photo;
  });
}

exports.default = function (file) {
  var id = idGenerator.id();
  var tempFilePath = void 0;
  return (0, _tempFileWriter2.default)(file).then(function (_ref) {
    var path = _ref.path;

    tempFilePath = path;
    return Promise.all(resizeToMultiple(tempFilePath));
  }).then(function (resizedResults) {
    Promise.all(upload(id, file, resizedResults));
    return resizedResults.map(function (_ref2) {
      var sizeLabel = _ref2.sizeLabel,
          width = _ref2.width,
          height = _ref2.height;
      return {
        sizeLabel: sizeLabel, width: width, height: height
      };
    }).reduce(function (prevVal, nextVal) {
      prevVal[nextVal.sizeLabel] = {
        height: nextVal.height,
        width: nextVal.width
      };

      return prevVal;
    }, {});
  }).then(function (resize) {
    return (0, _gm.metadata)(tempFilePath).then(function (md) {
      return _extends({
        resize: resize
      }, md);
    });
  }).then(function (metadata) {
    return insertToDb(id, file, metadata);
  }).then(function (photo) {
    return photoDataFormatter.dbToClient(photo);
  });
};