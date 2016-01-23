import express from 'express';
import logger from 'morgan';
import compression from 'compression';

const app = express();

app.use(logger());
app.use(compression());
app.use('/static', express.static(`${__dirname}/static`));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(3000, () => {
    console.log('localhost:3000');
});

