'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _new = require('./new');

var _new2 = _interopRequireDefault(_new);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
      (0, _new2.default)(req).then(function () {
            return res.status(204).end();
      }).catch(function (err) {
            return res.status(500).json({ err: err });
      });
});

exports.default = router;