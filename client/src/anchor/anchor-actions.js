import actionTypes from './anchor-action-types';

export function registerAnchor({id, domId, name, position}) {
    return {
        type: actionTypes.REGISTER_ANCHOR,
        data: {
            id, domId, name, position
        }
    };
}

export function unregisterAnchor(id) {
    return {
        type: actionTypes.UNREGISTER_ANCHOR,
        data: {
            id
        }
    };
}

export function updateAnchor(id, newData) {
    return {
        type: actionTypes.UPDATE_ANCHOR,
        data: {
            id,
            ...newData
        }
    };
}
