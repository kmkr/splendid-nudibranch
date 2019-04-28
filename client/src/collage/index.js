/** @jsx h */
import { h, Component } from 'preact'

import Photo from './photo'
import setPhotoWidth from './set-width-helper'
import throttle from './throttle'
import getWidth from './get-width'
import MidWater from './mid-water'

function hasScrollbar() {
  return document.body.offsetHeight >= window.innerHeight
}

function getIsCollage() {
  return getWidth() >= 1100
}

class Collage extends Component {
  constructor(props) {
    super()

    this.updateWidth = this.updateWidth.bind(this)
    this.renderPhotoGroup = this.renderPhotoGroup.bind(this)

    this.state = {
      width: getWidth()
    }
  }

  updateWidth() {
    this.setState({
      width: getWidth()
    })
  }

  componentDidMount() {
    throttle('resize', 'optimizedResize')
    window.addEventListener('optimizedResize', this.updateWidth)

    // Force re-calculation of photo height/width if scrollbar is present
    if (hasScrollbar()) {
      this.updateWidth()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('optimizedResize', this.updateWidth)
  }

  renderPhotoGroup(photoGroup) {
    const { onSelectPhoto } = this.props
    const setDimensions = getIsCollage()
    const style = setDimensions ? { height: `${photoGroup.height}px` } : {}
    return (
      <div
        class="photo-group"
        key={`photo-group-${photoGroup.key}`}
        style={style}
      >
        {photoGroup.photos.map(photo => (
          <Photo
            key={photo.key}
            setWidth={setDimensions}
            photo={photo}
            onSelect={onSelectPhoto}
          />
        ))}
      </div>
    )
  }

  render({ featuredPhotos, nonFeaturedPhotos }) {
    const featuredPhotoGroups = setPhotoWidth(featuredPhotos)
    const nonFeaturedPhotoGroups = setPhotoWidth(nonFeaturedPhotos)
    return (
      <div id="collage">
        {featuredPhotoGroups.map(this.renderPhotoGroup)}
        {!!featuredPhotoGroups.length && <MidWater />}
        {nonFeaturedPhotoGroups.map(this.renderPhotoGroup)}
      </div>
    )
  }
}

export default Collage
