import actionTypes from './update-photo-action-types';
import fetchActionFactory from '../../actions/fetch-action-factory';
import photoDataConversion from '../../photos/photo-data-conversion';

export function updatePhoto(photo, newValues) {
    return fetchActionFactory({
        actionTypes,
        url: `/photos/${photo.key}`,
        method: 'putJSON',
        options: newValues,
        responseHandler: response => photoDataConversion(response.data, response.data.base)
    });
}
