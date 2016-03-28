import actionTypes from './anchor-action-types';

const initialState = [];

function anchor(state, action) {
    switch (action.type) {
    case actionTypes.UPDATE_ANCHOR:
        if (state.id !== action.data.id) {
            return {...state};
        }

        return {
            ...state,
            ...action.data
        };
    default:
        return state;
    }
}

function sort(a, b) {
    return a.position.offsetTop - b.position.offsetTop;
}

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.REGISTER_ANCHOR:
        return [...state, action.data]
            .sort(sort);
    case actionTypes.UNREGISTER_ANCHOR:
        return state
            .filter(a => a.id !== action.data.id)
            .sort(sort);
    case actionTypes.UPDATE_ANCHOR:
        return state
            .map(anch => anchor(anch, action))
            .sort(sort);
    default:
        return state;
    }
};
