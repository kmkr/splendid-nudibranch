import actionTypes from './selected-tags-action-types';
import selectedTagsFromUrlParser from './selected-tags-from-url-parser';

export function setSelectedTags() {
    return {
        type: actionTypes.SET_SELECTED_TAGS,
        data: selectedTagsFromUrlParser()
    };
}
