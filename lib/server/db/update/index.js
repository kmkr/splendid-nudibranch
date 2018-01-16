"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (db, collectionName, filter, newValues) {
  return new Promise(function (resolve, reject) {
    db.collection(collectionName).updateOne(filter, { $set: _extends({}, newValues, { updated_at: new Date() }) }, function (err, data) {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
};