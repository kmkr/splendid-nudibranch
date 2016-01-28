import actionTypes from './photo-action-types';
import photoUploadActionTypes from '../admin/photos/upload-photo-action-types';
import reducerFactory from '../reducers/fetch-reducer-factory';

const reducer = reducerFactory({actionTypes, initialDataValue: []});

export default (state, action) => {
    switch (action.type) {
    case photoUploadActionTypes.RECEIVE:
        const data = [...state.data, action.data];
        return Object.assign({}, state, {data});
    default:
        return reducer(state, action);
    }
};
