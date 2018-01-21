/* eslint-env jest */

const {serverToClient} = require('./photo-data-conversion')

const base = 'http://my/base'
const photoFromServer = {
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
}

it('should convert', () => {
  const expected = `${base}/${photoFromServer.key}/s_${photoFromServer.name}`
  expect(serverToClient(photoFromServer, base).sizes.small.url).toBe(expected)
})

it('should contain size keys', () => {
  const clientVer = serverToClient(photoFromServer, base)

  expect(typeof clientVer.sizes.small === 'object').toBe(true)
  expect(typeof clientVer.sizes.medium === 'object').toBe(true)
  expect(typeof clientVer.sizes.large === 'object').toBe(true)
})

it('should include key', () => {
  expect(serverToClient(photoFromServer, base).key).toBe('1234-5678')
})
