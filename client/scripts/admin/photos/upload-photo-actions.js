import actionTypes from './upload-photo-action-types';
import fetchActionFactory from '../../actions/fetch-action-factory';
import photoDataConversion from '../../photos/photo-data-conversion';

export function uploadPhoto(photo) {
    return fetchActionFactory({
        actionTypes,
        url: '/photos',
        method: 'post',
        options: photo,
        responseHandler: ({data}) => photoDataConversion(data, data.base)
    });
}
