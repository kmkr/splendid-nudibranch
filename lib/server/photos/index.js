'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _upload = require('./upload');

var _upload2 = _interopRequireDefault(_upload);

var _delete = require('./delete');

var _delete2 = _interopRequireDefault(_delete);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _cache = require('../cache');

var cache = _interopRequireWildcard(_cache);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var upload = (0, _multer2.default)();

router.post('/', upload.single('file'), function (req, res) {
  (0, _upload2.default)(req.file).then(function (response) {
    cache.clear();
    return res.json(response);
  }).catch(function (error) {
    return res.status(500).json({ error: error });
  });
});

router.delete('/:id', function (req, res) {
  (0, _delete2.default)(req.params.id).then(function (response) {
    cache.clear();
    return res.json(response);
  }).catch(function (error) {
    console.log(error);
    res.status(500).json({ error: error });
  });
});

router.post('/metadata', function (req, res) {
  if (req.body.length === 0) {
    res.status(204).end();
    return;
  }

  var updatedPhotos = req.body;

  Promise.all(updatedPhotos.map(function (updatedPhoto) {
    return (0, _update2.default)(updatedPhoto.key, updatedPhoto);
  })).then(function () {
    cache.clear();
    res.status(204).end();
  }).catch(function (error) {
    return res.status(500).json({ error: error });
  });
});

exports.default = router;