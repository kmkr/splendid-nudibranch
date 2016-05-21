import React from 'react';
import {whyDidYouUpdate} from 'why-did-you-update';

if (process.env.NODE_ENV !== 'production') {
    whyDidYouUpdate(React);
}

import ReactDOM from 'react-dom';
import Wrapper from './wrapper';
import App from './app';

ReactDOM.render(
    <Wrapper>
        <App />
    </Wrapper>,
    document.getElementById('app')
);
