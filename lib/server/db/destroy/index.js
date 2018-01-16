"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (db, collectionName, filter) {
  return new Promise(function (resolve, reject) {
    db.collection(collectionName).deleteOne(filter, function (err, data) {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
};