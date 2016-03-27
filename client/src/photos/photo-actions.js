import actionTypes from './photo-action-types';
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
    const {photos, base} = window.sn.data;
    return {
        type: actionTypes.SET_PHOTOS,
        data: shuffle(photos.map(photo => photoDataConversion(photo, base)))
    };
}

export function selectPhoto(key) {
    return {
        type: actionTypes.SELECT_PHOTO,
        data: {
            key
        }
    };
}

