import {combineReducers} from 'redux';
import photoReducer from '../photos/photo-reducer';
import selectedTagsReducer from '../selected-tags/selected-tags-reducer';
import scrollReducer from '../scroll/scroll-reducer';
import anchorReducer from '../anchor/anchor-reducer';

export default combineReducers({
    photos: photoReducer,
    selectedTags: selectedTagsReducer,
    scroll: scrollReducer,
    anchors: anchorReducer
});
