import {
    deletePhotoActionTypes,
    updatePhotoActionTypes,
    uploadPhotoActionTypes
} from './edit-photo-action-types';
import fetchActionFactory from '../../actions/fetch-action-factory';
import photoDataConversion from '../../photos/photo-data-conversion';

export function uploadPhoto(photo) {
    return fetchActionFactory({
        actionTypes: uploadPhotoActionTypes,
        url: '/photos',
        method: 'post',
        options: photo,
        responseHandler: data => photoDataConversion(data, data.base)
    });
}

export function updatePhoto(photo, newValues) {
    return fetchActionFactory({
        actionTypes: updatePhotoActionTypes,
        url: `/photos/${photo.key}`,
        method: 'putJSON',
        options: newValues,
        requestHandler: () => ({key: photo.key}),
        responseHandler: data => photoDataConversion(data, data.base)
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
