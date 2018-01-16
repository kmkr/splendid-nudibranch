'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _photoDataConversion = require('./photo-data-conversion');

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

it('should convert', function () {
  var expected = base + '/' + photoFromServer.key + '/s_' + photoFromServer.name;
  expect((0, _photoDataConversion.serverToClient)(photoFromServer, base).sizes.small.url).toBe(expected);
});

it('should contain size keys', function () {
  var clientVer = (0, _photoDataConversion.serverToClient)(photoFromServer, base);

  expect(_typeof(clientVer.sizes.small) === 'object').toBe(true);
  expect(_typeof(clientVer.sizes.medium) === 'object').toBe(true);
  expect(_typeof(clientVer.sizes.large) === 'object').toBe(true);
});

it('should include key', function () {
  expect((0, _photoDataConversion.serverToClient)(photoFromServer, base).key).toBe('1234-5678');
});