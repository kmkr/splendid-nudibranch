export default ({initialDataValue, actionTypes = {}}) => {
    const initialState = {
        isFetching: false,
        data: initialDataValue
    };
    return function (state = initialState, action = {}) {
        const objectKey = action.objectKey || 'data';
        switch (action.type) {
        case actionTypes.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                error: undefined,
                [objectKey]: initialDataValue
            });
        case actionTypes.RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                error: undefined,
                [objectKey]: action.data
            });
        case actionTypes.FETCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                [objectKey]: initialDataValue
            });
        default:
            return state;
        }
    };
};
