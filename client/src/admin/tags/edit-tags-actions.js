import {
    setTagsForPhotoActionTypes
} from './edit-tags-action-types';
import fetchActionFactory from '../../actions/fetch-action-factory';

export function setTagsForPhoto(photo, tags) {
    return fetchActionFactory({
        actionTypes: setTagsForPhotoActionTypes,
        url: `/tags/${photo.key}`,
        method: 'postJSON',
        options: tags
    });
}
