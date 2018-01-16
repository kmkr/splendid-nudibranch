'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _s3Wrapper = require('./s3-wrapper');

exports.default = {
  upload: function upload(buffer, name, mimetype) {
    return new Promise(function (resolve, reject) {
      var params = (0, _s3Wrapper.generateParams)({
        ACL: 'public-read',
        Key: '' + name,
        Body: buffer,
        CacheControl: 'public, max-age',
        ContentType: mimetype,
        Expires: new Date(2100, 1)
      });

      console.log('[s3-uploader] Putting %s', name);

      _s3Wrapper.s3.putObject(params, function (err) {
        if (err) {
          return reject(err);
        }

        return resolve({
          uri: '/' + params.Key
        });
      });
    });
  }
};