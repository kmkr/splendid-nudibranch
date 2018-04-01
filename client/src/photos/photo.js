/** @jsx h */
import { h, Component } from 'preact'

import PhotoText from './photo-text'
import TransitionImage from '../transition-image'

function sizes(photo) {
  return photo.mode === 'portrait'
    ? '(min-width: 1100px) 50vw, 100vw'
    : '(min-width: 1100px) 95vw, 100vw'
}

function preload(photos) {
  photos.forEach((photo, index) => {
    const image = new Image()
    image.src = photo.sizes.large.url
    image.setAttribute('srcset', photo.srcSet)
    image.setAttribute('sizes', sizes(photo))
    const key = `snPreloadedPhoto${index}`
    window[key] = image
  })
}

class Photo extends Component {
  constructor(props) {
    super()
    preload(props.preloadPhotos)
  }

  componentWillReceiveProps(nextProps) {
    preload(nextProps.preloadPhotos)
  }

  componentWillUnmount() {
    if (this.el) {
      this.el.removeChild(this.el.querySelector('img'))
    }
  }

  render({ next, previous, photo }) {
    return (
      <div class={photo.mode}>
        <div class="photo-and-text">
          <div class="photo-wrapper" ref={el => (this.el = el)}>
            {previous}
            {next}
            <img alt={photo.title} srcSet={photo.srcSet} sizes={sizes(photo)} />
          </div>
          <PhotoText photo={photo} />
        </div>
      </div>
    )
  }
}

export default Photo
