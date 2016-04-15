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
                debugger;
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
                const toDispatch = {
                    type: actionTypes.FETCH_ERROR,
                    error: {
                        message: error.statusText,
                        type: error.status
                    }
                };
                error.json()
                    .then(data => {
                        dispatch({
                            ...toDispatch,
                            ...data
                        });
                    })
                    .catch(() => {
                        dispatch(toDispatch);
                    });
            });
    };
};
