import {combineReducers} from 'redux';
import photoReducer from '../photos/photo-reducer';
import scrollReducer from '../scroll/scroll-reducer';
import anchorReducer from '../anchor/anchor-reducer';
import selectedTagsReducer from '../tags/selected-tags-reducer';

export default combineReducers({
    photos: photoReducer,
    scroll: scrollReducer,
    anchors: anchorReducer,
    selectedTags: selectedTagsReducer
});
