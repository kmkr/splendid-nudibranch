const {s3, generateParams} = require('./s3-wrapper')

module.exports.listItems = function (prefix) {
  return new Promise((resolve, reject) => {
    console.log('[s3-lister] Fetching items with prefix %s', prefix)
    return s3.listObjects(generateParams({
      Prefix: prefix
    }), (err, data) => {
      if (err) {
        return reject(err)
      }
      if (data.IsTruncated) {
        return reject(new Error('s3-lister is not implemented to handle truncated results!'))
      }
      return resolve(data.Contents)
    })
  })
}
