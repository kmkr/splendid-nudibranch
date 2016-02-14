import actionTypes from './selected-tags-action-types';

export function selectTag(tagName) {
    return {
        type: actionTypes.SELECT_TAG,
        data: tagName
    };
}
