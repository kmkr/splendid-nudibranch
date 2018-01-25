/** @jsx h */
import { h, render } from 'preact'

import App from './app'
import './polyfills'

const photos = window.snPhotos

render(<App photos={photos} />, document.getElementById('app'))
