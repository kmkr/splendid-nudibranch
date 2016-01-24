import express from 'express';
import multer from 'multer';

import photoUploadHandler from './upload';

const router = express.Router();
const upload = multer();

router.post('/', upload.single('file'), (req, res) => {
    photoUploadHandler(req.file)
        .then(response => res.json(response))
        .catch(err => {
            console.log(err);
        });
});

export default router;
