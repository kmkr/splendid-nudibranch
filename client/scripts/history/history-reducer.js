import historyActionTypes from './history-action-types';

const initialState = {
    title: '',
    url: '/'
};

export default (state = initialState, action) => {
    switch (action.type) {
    case historyActionTypes.PUSH_HISTORY:
        return Object.assign({}, state, action.data);
    case historyActionTypes.POP_HISTORY:
    case historyActionTypes.SET_HISTORY:
        return Object.assign({}, state, action.data);
    default:
        return state;
    }
};
