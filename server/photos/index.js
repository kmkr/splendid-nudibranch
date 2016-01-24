import express from 'express';
import AWS from 'aws-sdk';
import multer from 'multer';

const router = express.Router();
const upload = multer();

function generateId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return `${s4()}-${s4()}-${s4()}-${s4()}`;
}

function generateParams(file) {
    const bucket = process.env.SN_S3_BUCKET_NAME;

    return {
        ACL: 'public-read',
        Bucket: bucket,
        Key: `photos/${generateId()}/${file.originalname}`,
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

router.post('/', upload.single('file'), (req, res) => {
    const params = generateParams(req.file);
    s3.putObject(params, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(data);
    });

    res.json({
        url: `https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/${params.Key}`
    });
});

export default router;
