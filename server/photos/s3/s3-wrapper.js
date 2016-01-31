import AWS from 'aws-sdk';
const bucket = process.env.SN_S3_BUCKET_NAME;

export const s3 = new AWS.S3({
    signatureVersion: 'v4'
});

export function generateParams(opts) {
    return Object.assign({
        Bucket: bucket
    }, opts);
}
