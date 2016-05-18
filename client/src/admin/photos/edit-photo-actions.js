import {
    batchUpdatePhotosActionTypes,
    deletePhotoActionTypes,
    updatePhotoActionTypes,
    uploadPhotoActionTypes
} from './edit-photo-action-types';
import fetchActionFactory from '../../actions/fetch-action-factory';
import {serverToClient} from '../../../../common/photo-data-conversion';

export function batchUpdatePhotos(photos) {
    return fetchActionFactory({
        actionTypes: batchUpdatePhotosActionTypes,
        url: '/photos/metadata',
        method: 'postJSON',
        options: photos
    });
}

export function uploadPhoto(photo) {
    return fetchActionFactory({
        actionTypes: uploadPhotoActionTypes,
        url: '/photos',
        method: 'post',
        options: photo,
        responseHandler: data => serverToClient(data, window.sn.data.photoData.base)
    });
}

export function updatePhoto(photo, newValues) {
    return fetchActionFactory({
        actionTypes: updatePhotoActionTypes,
        url: `/photos/${photo.key}`,
        method: 'putJSON',
        options: newValues,
        requestHandler: () => ({key: photo.key}),
        responseHandler: data => serverToClient(data, window.sn.data.photoData.base)
    });
}

export function deletePhoto(photo) {
    return fetchActionFactory({
        actionTypes: deletePhotoActionTypes,
        url: `/photos/${photo.key}`,
        method: 'delete',
        requestHandler: () => ({key: photo.key}),
        responseHandler: () => ({key: photo.key})
    });
}
