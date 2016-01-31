import actionTypes from './photo-action-types';
import {
    deletePhotoActionTypes,
    updatePhotoActionTypes,
    uploadPhotoActionTypes
} from '../admin/photos/edit-photo-action-types';
import reducerFactory from '../reducers/fetch-reducer-factory';

const reducer = reducerFactory({actionTypes, initialDataValue: []});

export default (state, action) => {
    switch (action.type) {
    case uploadPhotoActionTypes.RECEIVE:
        const data = [...state.data, action.data];
        return Object.assign({}, state, {data});
    case updatePhotoActionTypes.RECEIVE:
        const updatedKey = action.data.key;
        const elem = state.data.find(elem => elem.key === updatedKey);
        const index = state.data.indexOf(elem);
        const newData = [...state.data];
        newData[index] = action.data;
        return Object.assign({}, state, {data: newData});
    case deletePhotoActionTypes.RECEIVE:
        return Object.assign({}, state, {
            data: state.data.filter(elem => elem.key !== action.data.key)
        });
    default:
        return reducer(state, action);
    }
};
