/** @jsx h */
import { h, Component } from 'preact'

import PhotoText from './photo-text'
import TransitionImage from '../transition-image'

function sizes(photo) {
  return photo.mode === 'portrait'
    ? '(min-width: 1100px) 50vw, 100vw'
    : '(min-width: 1100px) 95vw, 100vw'
}

function preload(photo) {
  const image = new Image()
  image.src = photo.sizes.large.url
  image.setAttribute('srcset', photo.srcSet)
  image.setAttribute('sizes', sizes(photo))
  window.preloadedPhoto = image
}

class Photo extends Component {
  constructor(props) {
    super()
    preload(props.preloadPhoto)
  }

  componentWillReceiveProps(nextProps) {
    preload(nextProps.preloadPhoto)
  }

  render({ next, preloadPhoto, previous, photo }) {
    return (
      <div class={`photo-and-navigation ${photo.mode}`}>
        <div class="photo-and-text">
          <div class="photo-wrapper">
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
