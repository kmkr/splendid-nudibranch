import fs from 'fs';

import * as cache from './cache';
import listPhotos from './photos/list';

const indexHtml = `${__dirname}/index.html`;
const adminIndexHtml = `${__dirname}/index-admin.html`;

const content = fs.readFileSync(indexHtml, 'utf8');
const adminContent = fs.readFileSync(adminIndexHtml, 'utf8');

const stopWords = [
    /\d{4}/
];

function noStopWords(elem) {
    return stopWords.some(sw => sw.test(elem));
}

function onlyUnique(value, index, ary) {
    return ary.indexOf(value) === index;
}

function getKeywords(photos) {
    return [
        'diving',
        'scuba',
        'underwater',
        'photography',
        ...photos
            .map(p => p.location),
        ...photos
            .map(p => p.tags)
            .reduce((a, b) => a.concat(b), [])
            .filter(noStopWords)
    ]
    .filter(onlyUnique)
    .join(', ');
}

export function index() {
    if (cache.get('index.html')) {
        return Promise.resolve(cache.get('index.html'));
    }

    return listPhotos()
        .then(data => (
            content
                .replace('${data}', JSON.stringify(data))
                .replace('${keywords}', getKeywords(data.photos))
        ))
        .then(content => {
            cache.put('index.html', content);
            return content;
        });
}

export function adminIndex() {
    return listPhotos().then(photos => adminContent.replace('${data}', JSON.stringify(photos)));
}
