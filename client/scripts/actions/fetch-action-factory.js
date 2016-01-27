import snFetch from '../fetch';

const defaultResponseHandler = response => response.data;

export default ({
    actionTypes,
    url,
    options = {},
    responseHandler = defaultResponseHandler,
    errorHandler,
    objectKey
}) => {
    const requestAction = () => (
        {type: actionTypes.REQUEST}
    );

    const receiveAction = data => (
        {type: actionTypes.RECEIVE, data, objectKey}
    );

    const errorAction = error => {
        //remoteLogErrorHandler(error);
        return {
            type: actionTypes.FETCH_ERROR,
            error: {
                message: error.message,
                stack: error, //errorParser(error),
                raw: error
            }
        };
    };

    return dispatch => {
        dispatch(requestAction());
        return snFetch.get(url, options)
            .then(response => response.text())
            .then(text => {
                try {
                    return JSON.parse(text);
                } catch (e) {
                    return text;
                }
            })
            .then(content => {
                dispatch(receiveAction((responseHandler({data: content}))));
            })
            .catch(error => {
                if (typeof errorHandler === 'function') {
                    const handled = errorHandler(error);
                    if (handled) {
                        dispatch(receiveAction(handled));
                        return;
                    }
                }

                dispatch(errorAction(error));
            });
    };
};
