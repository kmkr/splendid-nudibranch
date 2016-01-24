import AWS from 'aws-sdk';

import idGenerator from './id-generator';

function generateParams(file) {
    const bucket = process.env.SN_S3_BUCKET_NAME;

    return {
        ACL: 'public-read',
        Bucket: bucket,
        Key: `photos/${idGenerator()}/${file.originalname}`,
        Body: file.buffer,
        CacheControl: 'public, max-age',
        ContentLength: file.size,
        ContentType: file.mimetype,
        Expires: new Date(2100, 1)
    };
}

const s3 = new AWS.S3({
    signatureVersion: 'v4'
});

export default {
    upload: (file) => {
        return new Promise((resolve, reject) => {
            const params = generateParams(file);

            s3.putObject(params, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }

                resolve({
                    url: `https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/${params.Key}`
                });
            });
        });
    }
};