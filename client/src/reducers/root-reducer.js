import {combineReducers} from 'redux';
import photoReducer from '../photos/photo-reducer';
import scrollReducer from '../scroll/scroll-reducer';
import anchorReducer from '../anchor/anchor-reducer';
import filterReducer from '../filters/filter-reducer';

export default combineReducers({
    photos: photoReducer,
    scroll: scrollReducer,
    anchors: anchorReducer,
    filters: filterReducer
});
