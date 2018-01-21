const idGenerator = require('../../id-generator')
const s3Uploader = require('../s3/s3-uploader')
const {resize, metadata: getMetadata} = require('./gm')
const tempFileWriter = require('./temp-file-writer')
const db = require('../../db')
const {base} = require('../constants')
const {resizeTo} = require('../../../common/constants')
const photoDataFormatter = require('../photo-data-formatter')

function resizeToMultiple (path) {
  return resizeTo.map(r => resize(path, r.width, r.name))
}

function upload (id, file, resizedResults) {
  const mimetype = file.mimetype

  function upl (prefix, buffer) {
    const name = `${id}/${prefix}_${file.originalname}`
    return s3Uploader.upload(buffer, name, mimetype)
  }

  return resizeTo.map((r, index) => (
        upl(r.shortName, resizedResults[index].buffer)
    ))
}

function insertToDb (id, file, additionalData) {
  const photo = {
    base,
    key: id,
    name: file.originalname,
    ...additionalData
  }

  console.log('Inserting photo:')
  console.log(photo)
  return db.insert('photos', photo).then(() => photo)
}

module.exports = file => {
  const id = idGenerator.id()
  let tempFilePath
  return tempFileWriter(file)
        .then(({path}) => {
          tempFilePath = path
          return Promise.all(resizeToMultiple(tempFilePath))
        })
        .then(resizedResults => {
          Promise.all(upload(id, file, resizedResults))
          return resizedResults.map(({sizeLabel, width, height}) => ({
            sizeLabel, width, height
          })).reduce((prevVal, nextVal) => {
            prevVal[nextVal.sizeLabel] = {
              height: nextVal.height,
              width: nextVal.width
            }

            return prevVal
          }, {})
        })
        .then(resize => {
          return getMetadata(tempFilePath)
                .then(md => ({
                  resize,
                  ...md
                }))
        })
        .then(metadata => insertToDb(id, file, metadata))
        .then(photo => photoDataFormatter.dbToClient(photo))
}
