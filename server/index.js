import './polyfills'
import bodyParser from 'body-parser'
import express from 'express'
import logger from 'morgan'
import compression from 'compression'

import {auth} from './auth'
import photoRouter from './photos'
import sitemapRouter from './sitemap'
import statsRouter from './statistics'
import robotsRouter from './robots'
import * as viewDataService from './view-data-service'
import {serverToClient} from './photos/photo-data-conversion'
import ogTags from './og-tags'
import {description} from '../common/constants'

function verifyEnv () {
  const missing = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'SN_DB_URL', 'SN_S3_BASE', 'SN_S3_BUCKET_NAME', 'SN_ADMIN_ACCESS_KEY']
        .filter(key => !process.env[key])
  if (missing.length) {
    throw new Error(`Missing required env key(s) ${missing.join(', ')}`)
  }
}

verifyEnv()

const app = express()
app.disable('x-powered-by')
app.use(compression())
app.use(logger('combined'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(auth)
app.use('/static', express.static(`${__dirname}/static`))

function photoIndex (res, {photoKey, year, location}) {
  return (
        Promise.all([
          viewDataService.getPhotoData(),
          viewDataService.getKeywords()
        ]).then(([photoData, keywords]) => {
          const photos = photoData.photos.map(p => serverToClient(p, photoData.base))
          return res.render('index', {
            description,
            photos: JSON.stringify(photos),
            ogTags: ogTags(photos, { selectedPhotoKey: photoKey, year, location }),
            selectedPhotoKey: photoKey,
            year,
            location,
            keywords
          })
        })
  )
}

app.get('/', (req, res) => {
  photoIndex(res, {year: req.query.year, location: req.query.location})
})

app.get('/photos/:key', (req, res) => {
  photoIndex(res, {photoKey: req.params.key, year: req.query.year, location: req.query.location})
})

app.get('/admin', (req, res) => {
  viewDataService.getPhotoData()
        .then(photoData => res.render('index-admin', {
          data: {
            photoData
          }
        }))
})
app.use('/photos', photoRouter)
app.use('/stats', statsRouter)
app.use('/sitemap.xml', sitemapRouter)
app.use('/robots.txt', robotsRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
