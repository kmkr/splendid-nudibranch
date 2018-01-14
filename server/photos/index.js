import express from 'express'
import multer from 'multer'

import photoUploadHandler from './upload'
import deletePhotoHandler from './delete'
import updatePhotoHandler from './update'
import * as cache from '../cache'

const router = express.Router()
const upload = multer()

router.post('/', upload.single('file'), (req, res) => {
  photoUploadHandler(req.file)
        .then(response => {
          cache.clear()
          return res.json(response)
        })
        .catch(error => res.status(500).json({error}))
})

router.delete('/:id', (req, res) => {
  deletePhotoHandler(req.params.id)
        .then(response => {
          cache.clear()
          return res.json(response)
        })
        .catch(error => {
          console.log(error)
          res.status(500).json({error})
        })
})

router.post('/metadata', (req, res) => {
  if (req.body.length === 0) {
    res.status(204).end()
    return
  }

  const updatedPhotos = req.body

  Promise.all(updatedPhotos.map(updatedPhoto => (
        updatePhotoHandler(updatedPhoto.key, updatedPhoto)
    )))
    .then(() => {
      cache.clear()
      res.status(204).end()
    })
    .catch(error => res.status(500).json({error}))
})

export default router
