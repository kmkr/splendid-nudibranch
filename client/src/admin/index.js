import React from 'react'
import ReactDOM from 'react-dom'
import Wrapper from '../wrapper'
import App from './app'

import './polyfills'

ReactDOM.render(
  <Wrapper>
    <App />
  </Wrapper>,
    document.getElementById('app')
)
