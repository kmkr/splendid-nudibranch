import React, {PropTypes} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import './polyfills';
import rootReducer from './reducers/root-reducer';

const logger = createLogger({
    predicate: () => __DEV__,
    collapsed: true
});

const store = applyMiddleware(thunk, logger)(createStore)(rootReducer);

const Wrapper = ({children}) => (
    <Provider store={store}>
        {children}
    </Provider>
);

Wrapper.propTypes = {
    children: PropTypes.node.isRequired
};

export default Wrapper;
