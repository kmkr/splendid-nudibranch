import getPhotosActionTypes from './photo-action-types';
import {
    deletePhotoActionTypes,
    uploadPhotoActionTypes
} from '../admin/photos/edit-photo-action-types';

function photo(state, action) {
    switch (action.type) {
    case getPhotosActionTypes.SET_PHOTOS:
        return {
            ...state,
            detailsActive: state.mode === 'portrait'
        };
    case uploadPhotoActionTypes.RECEIVE:
        return {...action.data};
    case getPhotosActionTypes.PHOTO_LOADED:
        if (action.data.key !== state.key) {
            return state;
        }

        return {
            ...state,
            loaded: true
        };
    case getPhotosActionTypes.TOGGLE_PHOTO_DETAILS:
        if (action.data.key !== state.key) {
            return state;
        }

        return {
            ...state,
            detailsActive: !state.detailsActive
        };
    case deletePhotoActionTypes.REQUEST:
        if (action.data.key !== state.key) {
            return state;
        }

        return {
            ...state,
            deleting: true
        };
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
        return {
            ...state,
            data: action.data.map(d => photo(d, action))
        };
    case getPhotosActionTypes.SELECT_PHOTO:
        return {
            ...state,
            data: placeItemWithNameFirst(state.data, action.data.key)
        };
    case uploadPhotoActionTypes.RECEIVE:
        return {
            ...state,
            data: [...state.data, photo(undefined, action)]
        };
    case getPhotosActionTypes.PHOTO_LOADED:
    case getPhotosActionTypes.TOGGLE_PHOTO_DETAILS:
    case deletePhotoActionTypes.REQUEST:
    case deletePhotoActionTypes.FETCH_ERROR:
        return {
            ...state,
            data: state.data.map(p => photo(p, action))
        };
    case deletePhotoActionTypes.RECEIVE:
        return {
            ...state,
            data: state.data.filter(elem => elem.key !== action.data.key)
        };
    default:
        return state;
    }
};
