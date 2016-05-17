import actionTypes from './photo-action-types';
import {serverToClient} from '../../../common/photo-data-conversion';

function firstXWithDescription(photos, num = 5) {
    let foundNum = 0;

    for (let i = 0; foundNum < num && i < photos.length; i++) {
        const photo = photos[i];
        if (photo.description) {
            foundNum++;
        } else {
            photos[i] = null;
            photos.push(photo);
        }
    }

    return photos.filter(p => p);
}
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
    const {photos, base} = window.sn.data.photoData;
    return {
        type: actionTypes.SET_PHOTOS,
        data: firstXWithDescription(shuffle(photos.map(photo => serverToClient(photo, base))))
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

export function photoLoaded(key) {
    return {
        type: actionTypes.PHOTO_LOADED,
        data: {
            key
        }
    };
}
