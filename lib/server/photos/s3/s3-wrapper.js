'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.s3 = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.generateParams = generateParams;

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bucket = process.env.SN_S3_BUCKET_NAME;

var s3 = exports.s3 = new _awsSdk2.default.S3({
  signatureVersion: 'v4'
});

function generateParams(opts) {
  return _extends({
    Bucket: bucket
  }, opts);
}