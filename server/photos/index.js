import express from 'express';
import multer from 'multer';

import photoUploadHandler from './upload';
import deletePhotoHandler from './delete';
import updatePhotoHandler from './update';
import * as cache from '../cache';

const router = express.Router();
const upload = multer();

router.post('/', upload.single('file'), (req, res) => {
    photoUploadHandler(req.file)
        .then(response => {
            cache.clear();
            return res.json(response);
        })
        .catch(error => res.status(500).json({error}));
});

router.put('/:id', (req, res) => {
    updatePhotoHandler(req.params.id, req.body)
        .then(response => {
            cache.clear();
            return res.json(response);
        })
        .catch(error => res.status(500).json({error}));
});

router.delete('/:id', (req, res) => {
    deletePhotoHandler(req.params.id)
        .then(response => {
            cache.clear();
            return res.json(response);
        })
        .catch(error => res.status(500).json({error}));
});

export default router;
