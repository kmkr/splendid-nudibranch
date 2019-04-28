/** @jsx h */
import { h, render } from 'preact'
import buildSrcSet from './photos/src-set-builder'

import App from './app'
import './polyfills'

const photos = window.snPhotos.map(photo => {
  photo.srcSet = buildSrcSet(photo.sizes)
  return photo
})

function renderApp() {
  render(<App photos={photos} />, document.getElementById('app'))
}

if (!window.IntersectionObserver) {
  import('intersection-observer').then(() => {
    renderApp()
  })
} else {
  renderApp()
}
