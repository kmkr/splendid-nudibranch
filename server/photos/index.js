import express from 'express';
import AWS from 'aws-sdk';
import multer from 'multer';
import fs from 'fs';

import s3Uploader from './s3-uploader';
import resizer from './resizer';
import tempFileWriter from './temp-file-writer';

const router = express.Router();
const upload = multer();

router.post('/', upload.single('file'), (req, res) => {
    tempFileWriter(req.file)
        .then(result => resizer(result.path, 200))
        .then(result => {
            const buffer = result.buffer;
            const name = req.file.originalname;
            const mimetype = req.file.mimetype;

            return s3Uploader.upload(buffer, name, mimetype)
        })
        .then(response => {
            res.json(response);
        })
        .catch(err => console.log(err));
});

export default router;
