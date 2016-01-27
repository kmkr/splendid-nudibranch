import {combineReducers} from 'redux';
import photoReducer from '../photos/photo-reducer';

export default combineReducers({
    photos: photoReducer
});
