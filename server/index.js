import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import compression from 'compression';

import photoRouter from './photos';

const app = express();
app.use(compression());
app.use(logger('combined'));
app.use(bodyParser.json());
app.use('/static', express.static(`${__dirname}/static`));

app.use('/photos', photoRouter);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

