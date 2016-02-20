import actionTypes from './photo-action-types';
import fetchActionFactory from '../actions/fetch-action-factory';
import photoDataConversion from './photo-data-conversion';

function shuffle(o) {
    let i, j, x;
    for (i = o.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = o[i - 1];
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
