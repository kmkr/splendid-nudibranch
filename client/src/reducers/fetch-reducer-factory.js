export default ({initialDataValue, actionTypes = {}}) => {
    const initialState = {
        ongoingRequest: false,
        data: initialDataValue
    };
    return function (state = initialState, action = {}) {
        switch (action.type) {
        case actionTypes.REQUEST:
            return Object.assign({}, state, {
                ongoingRequest: true,
                error: undefined,
                data: initialDataValue
            });
        case actionTypes.RECEIVE:
            return Object.assign({}, state, {
                ongoingRequest: false,
                error: undefined,
                data: action.data
            });
        case actionTypes.FETCH_ERROR:
            return Object.assign({}, state, {
                ongoingRequest: false,
                error: action.error,
                data: initialDataValue
            });
        default:
            return state;
        }
    };
};
