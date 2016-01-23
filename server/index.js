import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import compression from 'compression';

import photoRouter from './photos';

const app = express();

app.use(logger());
app.use(bodyParser.json());
app.use(compression());
app.use('/static', express.static(`${__dirname}/static`));

app.use('/photos', photoRouter);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(3000, () => {
    console.log('localhost:3000');
});

