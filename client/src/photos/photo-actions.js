import actionTypes from './photo-action-types';
import fetchActionFactory from '../actions/fetch-action-factory';
import photoDataConversion from './photo-data-conversion';

export function fetchPhotos() {
    return fetchActionFactory({
        actionTypes,
        url: '/photos',
        responseHandler: data => (
            data.photos.map(photo => photoDataConversion(photo, data.base))
        )
    });
}
