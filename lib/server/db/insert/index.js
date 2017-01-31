"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (db, collectionName, _item) {
    var now = new Date();
    var item = _extends({}, _item, {
        created_at: now,
        updated_at: now
    });

    return new Promise(function (resolve, reject) {
        return db.collection(collectionName).insert(item, function (err, result) {
            if (err) {
                return reject(err);
            }

            console.log("[db/index] Inserted item to collection " + collectionName);
            return resolve(result);
        });
    });
};