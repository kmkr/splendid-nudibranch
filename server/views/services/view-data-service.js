import * as cache from '../../cache';
import listPhotos from '../../photos/list';

export function getPhotoData() {
    return Promise.resolve(cache.get('photoData') || listPhotos())
    .then(photoData => {
        cache.put('photoData', photoData);
        return photoData;
    });
}

const stopWords = [
    /\d{4}/
];

function noStopWords(elem) {
    return stopWords.some(sw => sw.test(elem));
}

function onlyUnique(value, index, ary) {
    return ary.indexOf(value) === index;
}

export function getKeywords() {
    return getPhotoData()
        .then(({photos}) => (
            [
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
            .filter(t => t)
            .join(', ')
        ));
}
