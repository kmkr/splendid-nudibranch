/** @jsx h */
import { h, Component } from 'preact'

import PhotoText from './photo-text'
import Sidebar from './sidebar'
import TransitionImage from '../transition-image'
import buildSrcSet from './src-set-builder'

function preload(photo) {
  const image = new Image()
  image.src = photo.sizes.large.url
  image.setAttribute('srcset', buildSrcSet(photo.sizes))
  image.setAttribute('sizes', '100vw')
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
    const sizes =
      photo.mode === 'portrait'
        ? '(min-width: 1100px) 35vw, 100vw'
        : '(min-width: 1100px) 95vw, 100vw'
    return (
      <div class={`photo-and-navigation ${photo.mode}`}>
        <div class="photo-and-sidebar">
          <div class="photo-wrapper">
            {previous}
            {next}
            <img
              alt={photo.title}
              srcSet={buildSrcSet(photo.sizes)}
              src={photo.sizes.large.url}
              sizes={sizes}
            />
          </div>
          <PhotoText photo={photo} />
          <Sidebar photo={photo} />
        </div>
      </div>
    )
  }
}

export default Photo
