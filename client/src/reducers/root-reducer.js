import {combineReducers} from 'redux';
import photoReducer from '../photos/photo-reducer';
import historyReducer from '../history/history-reducer';
import selectedTagsReducer from '../selected-tags/selected-tags-reducer';
import scrollReducer from '../scroll/scroll-reducer';

export default combineReducers({
    photos: photoReducer,
    history: historyReducer,
    selectedTags: selectedTagsReducer,
    scroll: scrollReducer
});
