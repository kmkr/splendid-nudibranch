import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    console.log('handle post');

    res.json({
        url: '/url'
    });
});

export default router;
