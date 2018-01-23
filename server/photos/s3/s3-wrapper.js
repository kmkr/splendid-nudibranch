const AWS = require('aws-sdk')
const bucket = process.env.SN_S3_BUCKET_NAME

module.exports.s3 = new AWS.S3({
  signatureVersion: 'v4'
})

module.exports.generateParams = function(opts) {
  return {
    Bucket: bucket,
    ...opts
  }
}
