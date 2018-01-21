require('./polyfills')
const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const compression = require('compression')

const {auth} = require('./auth')
const photoRouter = require('./photos')
const sitemapRouter = require('./sitemap')
const statsRouter = require('./statistics')
const robotsRouter = require('./robots')
const viewDataService = require('./view-data-service')
const {serverToClient} = require('./photos/photo-data-conversion')
const ogTags = require('./og-tags')
const {description} = require('../common/constants')

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

const env = process.env.NODE_ENV
const indexCssFile = env === 'production' ? 'app.min.css' : 'app.css'

function photoIndex (res, {photoKey, year, location} = {}, jsFile = 'bundle.js', cssFile) {
  return (
        Promise.all([
          viewDataService.getPhotoData(),
          viewDataService.getKeywords()
        ]).then(([photoData, keywords]) => {
          const photos = photoData.photos.map(p => serverToClient(p, photoData.base))
          return res.render('index', {
            description,
            js: jsFile,
            css: cssFile,
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
  photoIndex(res, {year: req.query.year, location: req.query.location}, 'bundle.js', indexCssFile)
})

app.get('/photos/:key', (req, res) => {
  photoIndex(res, {photoKey: req.params.key, year: req.query.year, location: req.query.location})
})

app.get('/admin', (req, res) => {
  photoIndex(res, {}, 'admin-bundle.js', 'app-admin.css')
})

app.use('/photos', photoRouter)
app.use('/stats', statsRouter)
app.use('/sitemap.xml', sitemapRouter)
app.use('/robots.txt', robotsRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
