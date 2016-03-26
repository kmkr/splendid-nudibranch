import getPhotosActionTypes from './photo-action-types';
import {
    deletePhotoActionTypes,
    updatePhotoActionTypes,
    uploadPhotoActionTypes
} from '../admin/photos/edit-photo-action-types';
import collageActionTypes from '../collage/collage-action-types';

import {setTagsForPhotoActionTypes} from '../admin/tags/edit-tags-action-types';

function photo(state, action) {
    switch (action.type) {
    case uploadPhotoActionTypes.RECEIVE:
        return Object.assign({}, action.data);
    case setTagsForPhotoActionTypes.RECEIVE:
        const newTagsForPhoto = action.data
            .filter(t => t.photoKey === state.key)
            .map(t => t.name);

        return Object.assign({}, state, {
            tags: [...state.tags, ...newTagsForPhoto]
        });
    case updatePhotoActionTypes.REQUEST:
        if (action.data.key !== state.key) {
            return state;
        }

        return Object.assign({}, state, {updating: true, error: false});
    case updatePhotoActionTypes.RECEIVE:
        if (action.data.key !== state.key) {
            return state;
        }

        return Object.assign({}, state, {updating: false}, action.data);
    case setTagsForPhotoActionTypes.FETCH_ERROR:
    case updatePhotoActionTypes.FETCH_ERROR:
        if (action.data.key !== state.key) {
            return state;
        }

        return Object.assign({}, state, {deleting: false, updating: false, error: true}, action.data);
    case deletePhotoActionTypes.REQUEST:
        if (action.data.key !== state.key) {
            return state;
        }

        return Object.assign({}, state, {deleting: true});
    default:
        return state;
    }
}

function placeItemWithNameFirst(photos, key) {
    const matches = photos.filter(elem => elem.key === key);
    if (matches.length) {
        const photo = matches[0];
        return [
            photo,
            ...photos.filter(elem => elem.key !== key)
        ];
    }

    return photos;
}

const initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case getPhotosActionTypes.SET_PHOTOS:
        return Object.assign({}, state, {
            data: [...action.data]
        });
    case uploadPhotoActionTypes.RECEIVE:
        return Object.assign({}, state, {
            data: [...state.data, photo(undefined, action)]
        });
    case setTagsForPhotoActionTypes.RECEIVE:
    case setTagsForPhotoActionTypes.FETCH_ERROR:
    case updatePhotoActionTypes.REQUEST:
    case updatePhotoActionTypes.RECEIVE:
    case updatePhotoActionTypes.FETCH_ERROR:
    case deletePhotoActionTypes.REQUEST:
    case deletePhotoActionTypes.FETCH_ERROR:
        return Object.assign({}, state, {
            data: state.data.map(p => photo(p, action))
        });
    case deletePhotoActionTypes.RECEIVE:
        return Object.assign({}, state, {
            data: state.data.filter(elem => elem.key !== action.data.key)
        });
    case collageActionTypes.ITEM_SELECTED:
        return Object.assign({}, state, {
            data: placeItemWithNameFirst(state.data, action.data.key)
        });
    default:
        return state;
    }
};
