import scrollReducer from './scroll-action-types';

const initialState = {
    pageYOffset: 0,
    outerHeight: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
    case scrollReducer.UPDATE_POSITION:
    case scrollReducer.UPDATE_SIZE:
        return {
            ...state,
            ...action.data
        };
    default:
        return state;
    }
};
