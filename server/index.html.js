import fs from 'fs';

import {list as listPhotos} from './photos/cached-photos';

const indexHtml = `${__dirname}/index.html`;
const adminIndexHtml = `${__dirname}/index-admin.html`;

const content = fs.readFileSync(indexHtml, 'utf8');
const adminContent = fs.readFileSync(adminIndexHtml, 'utf8');

export function index() {
    return listPhotos().then(photos => content.replace('${data}', JSON.stringify(photos)));
}

export function adminIndex() {
    return listPhotos().then(photos => adminContent.replace('${data}', JSON.stringify(photos)));
}
