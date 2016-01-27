import actionTypes from './photo-action-types';
import reducerFactory from '../reducers/fetch-reducer-factory';

const asyncReducer = reducerFactory({actionTypes, initialDataValue: []});

export default (state, action) => asyncReducer(state, action);
