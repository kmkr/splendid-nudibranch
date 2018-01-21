const db = require('../../db')
const {base} = require('../constants')
const photoDataFormatter = require('../photo-data-formatter')

module.exports = () => (
    db.list('photos').then(photos => ({
      base,
      photos: photoDataFormatter.dbToClient(photos)
    }))
)
