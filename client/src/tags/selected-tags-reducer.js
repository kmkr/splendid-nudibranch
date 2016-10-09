import selectedTagsActionTypes from './selected-tags-action-types';

const initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case selectedTagsActionTypes.SET_SELECTED_TAGS:
        return {
            ...state,
            data: [...action.data]
        };
    case selectedTagsActionTypes.REMOVE_SELECTED_TAGS:
        return {
            ...state,
            data: []
        };
    default:
        return state;
    }
};
