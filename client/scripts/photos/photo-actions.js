import actionTypes from './photo-action-types';
import fetchActionFactory from '../actions/fetch-action-factory';

function buildUrl(base, key, name, size) {
    return `${base}/${key}/${size}_${name}`;
}

export function fetchPhotos() {
    return fetchActionFactory({
        actionTypes,
        url: '/photos',
        responseHandler: (response) => (
            response.data.photos.map(photo => (
                {
                    small: buildUrl(response.data.base, photo.key, photo.name, 's'),
                    medium: buildUrl(response.data.base, photo.key, photo.name, 'm'),
                    large: buildUrl(response.data.base, photo.key, photo.name, 'l')
                }
            ))
        )
    });
}
