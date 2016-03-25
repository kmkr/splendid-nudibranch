import express from 'express';

import newTagHandler from './new';
import getTagsHandler from './list';

const router = express.Router();

router.get('/', (req, res) => {
    getTagsHandler()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({err}));
});

router.post('/:id', (req, res) => {
    newTagHandler(req.params.id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({err}));
});

export default router;
