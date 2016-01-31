import actionTypes from './delete-photo-action-types';
import fetchActionFactory from '../../actions/fetch-action-factory';

export function deletePhoto(photo) {
    return fetchActionFactory({
        actionTypes,
        url: `/photos/${photo.key}`,
        method: 'delete'
    });
}
