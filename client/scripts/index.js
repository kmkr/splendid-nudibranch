import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import './polyfills';
import App from './app';
import rootReducer from './reducers/root-reducer';

const logger = createLogger({
    predicate: () => true,
    collapsed: true
});

const store = applyMiddleware(thunk, logger)(createStore)(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
