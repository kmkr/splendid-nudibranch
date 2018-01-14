import * as idGenerator from '../../../common/id-generator'
import s3Uploader from '../s3/s3-uploader'
import {resize, metadata as getMetadata} from './gm'
import tempFileWriter from './temp-file-writer'
import db from '../../db'
import {base} from '../constants'
import {resizeTo} from '../../../common/constants'
import * as photoDataFormatter from '../photo-data-formatter'

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

export default file => {
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
