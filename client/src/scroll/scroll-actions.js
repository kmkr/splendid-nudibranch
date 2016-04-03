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
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            availHeight: screen.availHeight * 0.9
        }
    };
}

