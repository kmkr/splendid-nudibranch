import actionTypes from './selected-tags-action-types';

export function selectTag(tagName) {
    return {
        type: actionTypes.SELECT_TAG,
        data: tagName
    };
}

export function unselectTag(tagName) {
    return {
        type: actionTypes.UNSELECT_TAG,
        data: tagName
    };
}
