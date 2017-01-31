'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongodb = require('mongodb');

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

var _insert = require('./insert');

var _insert2 = _interopRequireDefault(_insert);

var _destroy = require('./destroy');

var _destroy2 = _interopRequireDefault(_destroy);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = process.env.SN_DB_URL;
var getDb = new Promise(function (resolve, reject) {
    _mongodb.MongoClient.connect(url, function (err, db) {
        if (err) {
            return reject(err);
        }

        return resolve(db);
    });
});

exports.default = {
    insert: function insert(collectionName, data) {
        return getDb.then(function (db) {
            return (0, _insert2.default)(db, collectionName, data);
        });
    },
    list: function list(collectionName, filter) {
        return getDb.then(function (db) {
            return (0, _get2.default)(db, collectionName, filter);
        });
    },
    delete: function _delete(collectionName, filter) {
        return getDb.then(function (db) {
            return (0, _destroy2.default)(db, collectionName, filter);
        });
    },
    update: function update(collectionName, filter, newValues) {
        var _this = this;

        return getDb.then(function (db) {
            return (0, _update2.default)(db, collectionName, filter, newValues);
        }).then(function () {
            return _this.list(collectionName, filter);
        }).then(function (data) {
            return data[0];
        });
    },
    updateWithInsertFallback: function updateWithInsertFallback(collectionName, filter, data) {
        return getDb.then(function (db) {
            return (0, _get2.default)(db, collectionName, filter).then(function (collection) {
                if (collection.length) {
                    return (0, _update2.default)(db, collectionName, filter, data);
                }

                return (0, _insert2.default)(db, collectionName, data);
            });
        });
    }
};