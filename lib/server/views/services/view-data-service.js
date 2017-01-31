'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPhotoData = getPhotoData;
exports.getKeywords = getKeywords;

var _cache = require('../../cache');

var cache = _interopRequireWildcard(_cache);

var _list = require('../../photos/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getPhotoData() {
    return Promise.resolve(cache.get('photoData') || (0, _list2.default)()).then(function (photoData) {
        cache.put('photoData', photoData);
        return photoData;
    });
}

var stopWords = [/\d{4}/];

function noStopWords(elem) {
    return stopWords.some(function (sw) {
        return sw.test(elem);
    });
}

function onlyUnique(value, index, ary) {
    return ary.indexOf(value) === index;
}

function reduceFlatten(a, b) {
    return a.concat(b);
}

function getKeywords() {
    return getPhotoData().then(function (_ref) {
        var photos = _ref.photos;
        return ['diving', 'scuba', 'underwater', 'photography', 'fish', 'nudibranch', 'crab', 'shrimp', 'shark', 'macro'].concat(_toConsumableArray(photos
        // Location tags are separated by commas - I want all such word groups to be candidates for unique filter so that "The Philippines", "Pandan Island, The Philippines" and "Apo Reef, The Philippines" ends up as three separate keywords "Pandan Island", "Apo Reef" and "The Philippines"
        .map(function (p) {
            return (p.location || '').split(', ');
        }).reduce(reduceFlatten, [])), _toConsumableArray(photos.map(function (p) {
            return p.tags;
        }).reduce(reduceFlatten, []).filter(noStopWords))).filter(onlyUnique).filter(function (t) {
            return t;
        }).join(', ');
    });
}