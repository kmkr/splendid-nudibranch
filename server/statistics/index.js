import express from 'express';

import newStatEntryHandler from './new';

const router = express.Router();

router.post('/', (req, res) => {
    newStatEntryHandler(req)
        .then(() => res.status(204).end())
        .catch(err => res.status(500).json({err}));
});

export default router;
