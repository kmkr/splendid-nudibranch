import actionTypes from './history-action-types';

export function pushHistory(page) {
    window.history.pushState(null, page.title, page.url);
    return {
        type: actionTypes.PUSH_HISTORY,
        data: page
    };
}

export function popHistory(page) {
    return {
        type: actionTypes.POP_HISTORY,
        data: page
    };
}

export function setHistory(page) {
    return {
        type: actionTypes.SET_HISTORY,
        data: page
    };
}
