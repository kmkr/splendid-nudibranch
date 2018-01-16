'use strict';

var _s3Wrapper = require('./s3-wrapper');

it('should assign extras', function () {
  expect((0, _s3Wrapper.generateParams)({ foo: 'bar' }).foo).toBe('bar');
});