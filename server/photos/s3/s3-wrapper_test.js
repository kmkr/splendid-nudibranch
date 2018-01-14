import {generateParams} from './s3-wrapper'

it('should assign extras', () => {
  expect(generateParams({foo: 'bar'}).foo).toBe('bar')
})
