const { s3, generateParams } = require("./s3-wrapper");

const oneYear = 60 * 60 * 24 * 365;
module.exports = (buffer, name, mimetype) =>
  new Promise((resolve, reject) => {
    const params = generateParams({
      ACL: "public-read",
      Key: `${name}`,
      Body: buffer,
      CacheControl: `public, max-age=${oneYear}`,
      ContentType: mimetype,
      Expires: new Date(2100, 1),
    });

    console.log("[s3-uploader] Putting %s", name);

    s3.putObject(params, (err) => {
      console.log("[s3-uploader] %s uploaded to s3", name);
      if (err) {
        return reject(err);
      }

      return resolve({
        uri: `/${params.Key}`,
      });
    });
  });
