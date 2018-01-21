/* eslint-env jest */

const {generateParams} = require('./s3-wrapper')

it('should assign extras', () => {
  expect(generateParams({foo: 'bar'}).foo).toBe('bar')
})
