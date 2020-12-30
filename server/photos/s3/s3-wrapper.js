const AWS = require("aws-sdk");
const { BUCKET } = require("../constants");

module.exports.s3 = new AWS.S3({
  signatureVersion: "v4",
});

module.exports.generateParams = function (opts) {
  return {
    Bucket: BUCKET,
    ...opts,
  };
};
