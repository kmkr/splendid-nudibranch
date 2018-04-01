const db = require('../../db')
const { base } = require('../constants')
const photoDataFormatter = require('../photo-data-formatter')

module.exports = () =>
  db.list('photos').then(photos => {
    const sortedPhotos = photos.sort(
      (p1, p2) => p2.shot_at.getTime() - p1.shot_at.getTime()
    )

    return {
      base,
      photos: photoDataFormatter.dbToClient(sortedPhotos)
    }
  })
