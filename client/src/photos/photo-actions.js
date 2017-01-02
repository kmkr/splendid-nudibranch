import actionTypes from './photo-action-types';
import {serverToClient} from '../../../common/photo-data-conversion';

function firstXWithDescription(photos, num = 5) {
    let foundNum = 0;
    const length = photos.length;

    for (let i = 0; i < length && foundNum < num; i++) {
        const photo = photos[i];

        if (photo.description) {
            foundNum++;
        } else {
            // Place at the end of the array
            photos[i] = null;
            photos.push(photo);
        }
    }

    return photos.filter(p => p);
}
function shuffle(photos) {
    for (let i = photos.length; i; i -= 1) {
        const j = Math.floor(Math.random() * i);
        const x = photos[i - 1];
        photos[i - 1] = photos[j];
        photos[j] = x;
    }

    return photos;
}

export function fetchPhotos() {
    const {photos, base} = window.sn.data.photoData;
    return {
        type: actionTypes.SET_PHOTOS,
        data: firstXWithDescription(
            shuffle(
                photos.map(photo => serverToClient(photo, base))
            )
        )
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

export function toggleDetails(key) {
    return {
        type: actionTypes.TOGGLE_PHOTO_DETAILS,
        data: {
            key
        }
    };
}
