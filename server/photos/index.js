import express from 'express';
import multer from 'multer';

import photoUploadHandler from './upload';
import getPhotosHandler from './list';
import deletePhotoHandler from './delete';
import updatePhotoHandler from './update';
import * as cache from '../cache';

const router = express.Router();
const upload = multer();

router.get('/', (req, res) => {
    if (cache.get('photos')) {
        console.log('Serving from cache');
        return res.json(cache.get('photos'));
    }

    getPhotosHandler()
        .then(response => cache.put('photos', response))
        .then(() => res.json(cache.get('photos')))
        .catch(error => {
            return res.status(500).json({error});
        });
});

router.post('/', upload.single('file'), (req, res) => {
    cache.clear('photos');

    photoUploadHandler(req.file)
        .then(response => res.json(response))
        .catch(error => res.status(500).json({error}));
});

router.put('/:id', (req, res) => {
    cache.clear('photos');

    updatePhotoHandler(req.params.id, req.body)
        .then(response => res.json(response))
        .catch(error => res.status(500).json({error}));
});

router.delete('/:id', (req, res) => {
    cache.clear('photos');

    deletePhotoHandler(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json({error}));
});

export default router;
