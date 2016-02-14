import {combineReducers} from 'redux';
import photoReducer from '../photos/photo-reducer';
import historyReducer from '../history/history-reducer';

export default combineReducers({
    photos: photoReducer,
    history: historyReducer
});
