'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.listItems = listItems;

var _s3Wrapper = require('./s3-wrapper');

function listItems(prefix) {
    return new Promise(function (resolve, reject) {
        console.log('[s3-lister] Fetching items with prefix %s', prefix);
        return _s3Wrapper.s3.listObjects((0, _s3Wrapper.generateParams)({
            Prefix: prefix
        }), function (err, data) {
            if (err) {
                return reject(err);
            }
            if (data.IsTruncated) {
                return reject('s3-lister is not implemented to handle truncated results!');
            }
            return resolve(data.Contents);
        });
    });
}