import actionTypes from './filter-action-types';

const initialState = {
    data: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.SET_FILTERS:
        return {
            ...state,
            data: action.data
        };
    default:
        return state;
    }
};
