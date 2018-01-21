const gm = require('gm')

module.exports.resize = function (filePath, size, sizeLabel) {
  return new Promise((resolve, reject) => {
    console.log('[resizer.js] Resizing file %s to %s', filePath, size)
    gm(filePath)
            .resize(size, size)
            .autoOrient()
            .stream((err, stdout) => {
              if (err) {
                return reject(err)
              }
              let buf = Buffer.from('')
              stdout.on('data', data => {
                buf = Buffer.concat([buf, data])
              })
              stdout.on('end', () => {
                gm(buf).identify((_, value) => {
                  return resolve({
                    sizeLabel,
                    ...value.size,
                    buffer: buf
                  })
                })
              })
            })
  })
}

function parseDate (exifDate) {
    // 2016:04:09 21:11:45 to 2016-04-09 21:11:45
  return new Date(exifDate.replace(':', '-'))
}

module.exports.metadata = function (filePath) {
  return new Promise((resolve, reject) => {
    gm(filePath).identify((err, value) => {
      if (err) {
        return reject(err)
      }

      console.log(value)
      const exif = value['Profile-EXIF']
      const dateTimeOrig = exif && exif['Date Time Original']
      return resolve({
        ...value.size,
        shot_at: dateTimeOrig ? parseDate(dateTimeOrig) : new Date()
      })
    })
  })
}
