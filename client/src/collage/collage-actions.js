import actionTypes from './collage-action-types';

export function collageItemSelected(key) {
    return {
        type: actionTypes.ITEM_SELECTED,
        data: {
            key
        }
    };
}
