import scrollReducer from './scroll-action-types';

const initialState = {
    pageYOffset: 0,
    innerWidth: 0,
    innerHeight: 0,
    availHeight: 0
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
