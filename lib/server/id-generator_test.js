'use strict';

var _idGenerator = require('./id-generator');

var idGenerator = _interopRequireWildcard(_idGenerator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

it('generation of id', function () {
  expect(idGenerator.id()).toMatch(/[a-z0-9]{4}-[a-z0-9]{4}/);
});