import getPhotosActionTypes from './photo-action-types';
import {
    deletePhotoActionTypes,
    updatePhotoActionTypes,
    uploadPhotoActionTypes
} from '../admin/photos/edit-photo-action-types';
import reducerFactory from '../reducers/fetch-reducer-factory';

const getPhotosReducer = reducerFactory({
    actionTypes: getPhotosActionTypes,
    initialDataValue: []
});

function photo(state, action) {
    switch (action.type) {
    case uploadPhotoActionTypes.RECEIVE:
        return Object.assign({}, action.data);
    case updatePhotoActionTypes.RECEIVE:
        if (action.data.key !== state.key) {
            return state;
        }

        return Object.assign({}, state, action.data);
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
    case updatePhotoActionTypes.RECEIVE:
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
