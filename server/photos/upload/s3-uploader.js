import AWS from 'aws-sdk';

function generateParams(buffer, name, mimetype) {
    const bucket = process.env.SN_S3_BUCKET_NAME;

    return {
        ACL: 'public-read',
        Bucket: bucket,
        Key: `photos/${name}`,
        Body: buffer,
        CacheControl: 'public, max-age',
        ContentType: mimetype,
        Expires: new Date(2100, 1)
    };
}

const s3 = new AWS.S3({
    signatureVersion: 'v4'
});

export default {
    upload: (buffer, name, mimetype) => {
        return new Promise((resolve, reject) => {
            const params = generateParams(buffer, name, mimetype);

            console.log('[s3-uploader] Putting', params);
            s3.putObject(params, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve({
                    url: `https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/${params.Key}`
                });
            });
        });
    }
};
