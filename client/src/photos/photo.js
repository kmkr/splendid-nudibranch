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

  render() {
    const { next, preloadPhoto, previous, photo } = this.props
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
              sizes="100vw"
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
