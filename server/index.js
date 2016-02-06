import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import compression from 'compression';

import photoRouter from './photos';
import sitemapRouter from './sitemap';
import robotsRouter from './robots';

const app = express();
app.use(compression());
app.use(logger('combined'));
app.use(bodyParser.json());
app.use('/static', express.static(`${__dirname}/static`));
app.use('/photos', photoRouter);
app.use('/sitemap.xml', sitemapRouter);
app.use('/robots.txt', robotsRouter);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/admin', (req, res) => {
    res.sendFile(`${__dirname}/index-admin.html`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

