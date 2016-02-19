import snFetch from '../fetch';

const defaultRequestHandler = () => null;
const defaultResponseHandler = response => response;

export default ({
    actionTypes,
    url,
    options = {},
    responseHandler = defaultResponseHandler,
    requestHandler = defaultRequestHandler,
    errorHandler,
    method = 'get'
}) => {
    return dispatch => {
        dispatch({
            type: actionTypes.REQUEST,
            data: requestHandler()
        });
        return snFetch[method](url, options)
            .then(response => response.json())
            .then(content => {
                dispatch({
                    type: actionTypes.RECEIVE,
                    data: responseHandler(content)
                });
            })
            .catch(error => {
                if (typeof errorHandler === 'function') {
                    const handled = errorHandler(error);
                    if (handled) {
                        dispatch({
                            type: actionTypes.RECEIVE,
                            data: responseHandler(handled)
                        });
                        return;
                    }
                }

                // todo: send error to backend
                dispatch({
                    type: actionTypes.FETCH_ERROR,
                    error: {
                        message: error.message,
                        stack: error, //todo: parse error
                        raw: error
                    }
                });
            });
    };
};
