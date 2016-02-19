import getPhotosActionTypes from './photo-action-types';
import {
    deletePhotoActionTypes,
    updatePhotoActionTypes,
    uploadPhotoActionTypes
} from '../admin/photos/edit-photo-action-types';

import {setTagsForPhotoActionTypes} from '../admin/tags/edit-tags-action-types';
import reducerFactory from '../reducers/fetch-reducer-factory';

const getPhotosReducer = reducerFactory({
    actionTypes: getPhotosActionTypes,
    initialDataValue: []
});

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

        return Object.assign({}, state, {updating: true});
    case updatePhotoActionTypes.RECEIVE:
        if (action.data.key !== state.key) {
            return state;
        }

        return Object.assign({}, state, {updating: false}, action.data);
    case deletePhotoActionTypes.REQUEST:
        if (action.data.key !== state.key) {
            return state;
        }

        return Object.assign({}, state, {deleting: true});
    default:
        return state;
    }
}

export default (state, action) => {
    switch (action.type) {
    case uploadPhotoActionTypes.RECEIVE:
        return Object.assign({}, state, {
            data: [...state.data, photo(undefined, action)]
        });
    case setTagsForPhotoActionTypes.RECEIVE:
    case updatePhotoActionTypes.REQUEST:
    case updatePhotoActionTypes.RECEIVE:
    case deletePhotoActionTypes.REQUEST:
        return Object.assign({}, state, {
            data: state.data.map(p => photo(p, action))
        });
    case deletePhotoActionTypes.RECEIVE:
        return Object.assign({}, state, {
            data: state.data.filter(elem => elem.key !== action.data.key)
        });
    default:
        return getPhotosReducer(state, action);
    }
};
