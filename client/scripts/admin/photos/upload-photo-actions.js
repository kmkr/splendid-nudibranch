import actionTypes from './upload-photo-action-types';
import fetchActionFactory from '../../actions/fetch-action-factory';

function buildUrl(base, key, name, size) {
    return `${base}/${key}/${size}_${name}`;
}

export function uploadPhoto(photo) {
    return fetchActionFactory({
        actionTypes,
        url: '/photos',
        method: 'post',
        options: photo,
        responseHandler: ({data}) => ({
            small: buildUrl(data.base, data.key, data.name, 's'),
            medium: buildUrl(data.base, data.key, data.name, 'm'),
            large: buildUrl(data.base, data.key, data.name, 'l')
        })
    });
}
