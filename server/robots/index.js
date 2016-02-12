import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.header('Content-Type', 'text/plain');
    res.send(`
User-agent: *
Disallow: /admin
`);
});

export default router;
