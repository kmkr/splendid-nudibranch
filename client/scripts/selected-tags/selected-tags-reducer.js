import tagActionTypes from './selected-tags-action-types';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
    case tagActionTypes.SELECT_TAG:
        return [...state, action.data];
    case tagActionTypes.UNSELECT_TAG:
        return state.filter(tagName => tagName !== action.data);
    default:
        return state;
    }
};