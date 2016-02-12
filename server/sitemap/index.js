import express from 'express';
import sm from 'sitemap';

const router = express.Router();

let sitemap = sm.createSitemap({
    hostname: 'http://splendid-nudibran.ch', //todo
    cacheTime: 600000,
    urls: [
        {
            url: '//',
            changefreq: 'daily',
            priority: 0.3
        }
    ]
});

router.get('/', (req, res) => {
    sitemap.toXML(function (err, xml) {
        if (err) {
            return res.status(500).end();
        }

        res.header('Content-Type', 'application/xml');
        res.send(xml);
    });
});

export default router;
