import express from 'express';
import AWS from 'aws-sdk';
import multer from 'multer';

import s3Uploader from './s3-uploader';

const router = express.Router();
const upload = multer();

router.post('/', upload.single('file'), (req, res) => {
    s3Uploader.upload(req.file)
        .then(response => {
            console.log(response);
            res.json(response);
        })
        .catch(err => {
            console.log(err);
        });
});

export default router;
