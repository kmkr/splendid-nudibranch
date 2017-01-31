'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _photoDataConversion = require('./photo-data-conversion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base = 'http://my/base';
var photoFromServer = {
    key: '1234-5678',
    name: 'ole-brumm.jpg',
    location: 'loc',
    resize: {
        thumb: {
            width: 40,
            height: 20
        },
        xsmall: {
            width: 80,
            height: 40
        },
        small: {
            width: 100,
            height: 50
        },
        medium: {
            width: 200,
            height: 100
        },
        large: {
            width: 300,
            height: 150
        }
    }
};

(0, _ava2.default)('should convert', function (t) {
    var expected = base + '/' + photoFromServer.key + '/s_' + photoFromServer.name;
    t.is((0, _photoDataConversion.serverToClient)(photoFromServer, base).sizes.small.url, expected);
});

(0, _ava2.default)('should contain size keys', function (t) {
    var clientVer = (0, _photoDataConversion.serverToClient)(photoFromServer, base);

    t.true(_typeof(clientVer.sizes.small) === 'object');
    t.true(_typeof(clientVer.sizes.medium) === 'object');
    t.true(_typeof(clientVer.sizes.large) === 'object');
});

(0, _ava2.default)('should include key', function (t) {
    t.is((0, _photoDataConversion.serverToClient)(photoFromServer, base).key, '1234-5678');
});