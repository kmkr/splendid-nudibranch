import actionTypes from './scroll-action-types';

export function updatePosition() {
    return {
        type: actionTypes.UPDATE_POSITION,
        data: {
            pageYOffset: window.pageYOffset
        }
    };
}

export function updateSize() {
    return {
        type: actionTypes.UPDATE_SIZE,
        data: {
            innerHeight: window.innerHeight
        }
    };
}

