import actionTypes from './photo-action-types';
import fetchActionFactory from '../actions/fetch-action-factory';
import photoDataConversion from './photo-data-conversion';

function shuffle(o) {
    for (let i = o.length; i; i -= 1) {
        const j = Math.floor(Math.random() * i);
        const x = o[i - 1];
        o[i - 1] = o[j];
        o[j] = x;
    }

    return o;
}

export function fetchPhotos() {
    return fetchActionFactory({
        actionTypes,
        url: '/photos',
        responseHandler: data => (
            shuffle(data.photos.map(photo => photoDataConversion(photo, data.base)))
        )
    });
}
