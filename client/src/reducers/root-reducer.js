import {combineReducers} from 'redux';
import photoReducer from '../photos/photo-reducer';
import selectedTagsReducer from '../selected-tags/selected-tags-reducer';
import scrollReducer from '../scroll/scroll-reducer';

export default combineReducers({
    photos: photoReducer,
    selectedTags: selectedTagsReducer,
    scroll: scrollReducer
});
