"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (db, collectionName, filter) {
    return new Promise(function (resolve, reject) {
        return db.collection(collectionName).find(filter).toArray(function (err, result) {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        });
    });
};