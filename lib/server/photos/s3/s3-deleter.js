'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deletePhoto = deletePhoto;

var _s3Wrapper = require('./s3-wrapper');

var _s3Lister = require('./s3-lister');

var _constants = require('../../../common/constants');

function expectNumberOfKeys() {
    var numOriginalUpload = 0;

    return _constants.resizeTo.length + numOriginalUpload;
}

function deletePhoto(key) {
    return new Promise(function (resolve, reject) {
        return (0, _s3Lister.listItems)(key).then(function (data) {
            if (data.length > expectNumberOfKeys()) {
                return reject('Expected ' + expectNumberOfKeys() + ' keys with prefix ' + key + ', but found ' + data.length + '. Aborting deletion');
            }

            var keys = data.map(function (elem) {
                return {
                    Key: elem.Key
                };
            });

            console.log('[s3-deleter] Deleting %s keys', keys.length);

            _s3Wrapper.s3.deleteObjects((0, _s3Wrapper.generateParams)({
                Delete: {
                    Objects: keys
                }
            }), function (err, data) {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
        });
    });
}