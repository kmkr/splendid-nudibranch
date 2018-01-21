const db = require('../../db')
const {deletePhoto} = require('../s3/s3-deleter')

module.exports = (key) => {
  return deletePhoto(key)
        .then(() => db.delete('photos', {key}))
        .then(() => ({key}))
}
