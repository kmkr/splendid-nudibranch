import express from 'express';

import newTagHandler from './new';
import getTagsHandler from './list';

const router = express.Router();

router.get('/', (req, res) => {
    getTagsHandler()
        .then(response => res.json(response))
        .catch(err => res.stats(500).json({err}));
});

router.post('/', (req, res) => {
    newTagHandler(req)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({err}));
});

export default router;
