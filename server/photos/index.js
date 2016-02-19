import express from 'express';
import multer from 'multer';

import photoUploadHandler from './upload';
import getPhotosHandler from './list';
import deletePhotoHandler from './delete';
import updatePhotoHandler from './update';

const router = express.Router();
const upload = multer();


router.get('/', (req, res) => {
    getPhotosHandler()
        .then(response => res.json(response))
        .catch(error => {
            console.log(error);
            return res.status(500).json({error});
        });
});

router.post('/', upload.single('file'), (req, res) => {
    photoUploadHandler(req.file)
        .then(response => res.json(response))
        .catch(error => res.status(500).json({error}));
});

router.put('/:id', (req, res) => {
    updatePhotoHandler(req.params.id, req.body)
        .then(response => res.json(response))
        .catch(error => res.status(500).json({error}));
});

router.delete('/:id', (req, res) => {
    deletePhotoHandler(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json({error}));
});

export default router;
