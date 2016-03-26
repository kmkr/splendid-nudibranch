import express from 'express';
import multer from 'multer';

import photoUploadHandler from './upload';
import {list} from './cached-photos';
import deletePhotoHandler from './delete';
import updatePhotoHandler from './update';
import * as cache from '../cache';

const router = express.Router();
const upload = multer();

router.get('/', (req, res) => {
    return list()
        .then(response => res.json(response))
        .catch(error => res.status(500).json({error}));
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
