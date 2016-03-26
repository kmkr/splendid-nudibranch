import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import compression from 'compression';

import {auth} from './auth';
import photoRouter from './photos';
import tagRouter from './tags';
import sitemapRouter from './sitemap';
import statsRouter from './statistics';
import robotsRouter from './robots';

const indexHtml = `${__dirname}/index.html`;

function verifyEnv() {
    const missing = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'SN_DB_URL', 'SN_S3_BASE', 'SN_S3_BUCKET_NAME', 'SN_ADMIN_ACCESS_KEY']
        .filter(key => !process.env[key]);
    if (missing.length) {
        throw new Error(`Missing required env key(s) ${missing.join(', ')}`);
    }
}

verifyEnv();

const app = express();
app.use(compression());
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(auth);
app.use('/static', express.static(`${__dirname}/static`));
app.use('/photos', photoRouter);
app.use('/tags', tagRouter);
app.use('/stats', statsRouter);
app.use('/sitemap.xml', sitemapRouter);
app.use('/robots.txt', robotsRouter);

app.get('/', (req, res) => {
    res.sendFile(indexHtml);
});

app.get('/admin', (req, res) => {
    res.sendFile(`${__dirname}/index-admin.html`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

