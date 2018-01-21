const cache = require('./cache')
const listPhotos = require('./photos/list')

function getPhotoData () {
  return Promise.resolve(cache.get('photoData') || listPhotos()).then(
    photoData => {
      cache.put('photoData', photoData)
      return photoData
    }
  )
}

module.exports.getPhotoData = getPhotoData

const stopWords = [/\d{4}/]

function noStopWords (elem) {
  return stopWords.some(sw => sw.test(elem))
}

function onlyUnique (value, index, ary) {
  return ary.indexOf(value) === index
}

function reduceFlatten (a, b) {
  return a.concat(b)
}

module.exports.getKeywords = function () {
  return getPhotoData().then(({ photos }) =>
    [
      'diving',
      'scuba',
      'underwater',
      'photography',
      'fish',
      'nudibranch',
      'crab',
      'shrimp',
      'shark',
      'macro',
      ...photos
        // Location tags are separated by commas - I want all such word groups to be candidates for unique filter so that "The Philippines", "Pandan Island, The Philippines" and "Apo Reef, The Philippines" ends up as three separate keywords "Pandan Island", "Apo Reef" and "The Philippines"
        .map(p => (p.location || '').split(', '))
        .reduce(reduceFlatten, []),
      ...photos
        .map(p => p.tags)
        .reduce(reduceFlatten, [])
        .filter(noStopWords)
    ]
      .filter(onlyUnique)
      .filter(t => t)
      .join(', ')
  )
}
