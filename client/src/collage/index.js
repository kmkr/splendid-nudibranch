/** @jsx h */
import { h, Component } from 'preact'

import Photo from './photo'
import setPhotoWidth from './set-width-helper'
import throttle from './throttle'
import getWidth from './get-width'
import MidWater from './mid-water'
import { getNumLoaded, setNumLoaded } from './num-loaded-photos'

function hasScrollbar() {
  return document.body.offsetHeight >= window.innerHeight
}

function getIsCollage() {
  return getWidth() >= 1100
}

class Collage extends Component {
  constructor(props) {
    super()

    const isCollage = getIsCollage()
    this.updateWidth = this.updateWidth.bind(this)
    this.updateLoadedPhotos = this.updateLoadedPhotos.bind(this)
    this.renderPhotoGroup = this.renderPhotoGroup.bind(this)

    const numPhotos =
      props.featuredPhotos.length + props.nonFeaturedPhotos.length

    if (!isCollage) {
      throttle('scroll', 'optimizedScroll')
      window.addEventListener('optimizedScroll', this.updateLoadedPhotos)
    }
    this.state = {
      width: getWidth(),
      // Old devices (at least old iPads) breaks if all photos are loaded at once. Load only 8 photos at a time.
      loadPhotos: isCollage ? numPhotos : Math.max(3, getNumLoaded())
    }
  }

  updateWidth() {
    this.setState({
      width: getWidth()
    })
  }

  updateLoadedPhotos() {
    const threshold = 2000
    const totalHeight = document.body.offsetHeight
    const scrollPos = window.scrollY
    if (scrollPos >= totalHeight - window.innerHeight - threshold) {
      const additionalLoad = getIsCollage() ? 4 : 2
      const numPhotos =
        this.props.featuredPhotos.length + this.props.nonFeaturedPhotos.length
      const newNumLoadedPhotos = Math.min(
        this.state.loadPhotos + additionalLoad,
        numPhotos
      )
      setNumLoaded(newNumLoadedPhotos)
      this.setState({
        loadPhotos: newNumLoadedPhotos
      })
    }
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
    window.removeEventListener('optimizedScroll', this.updateLoadedPhotos)
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

  render({ featuredPhotos, nonFeaturedPhotos }, { loadPhotos }) {
    const featuredPhotoGroups = setPhotoWidth(
      featuredPhotos.slice(0, loadPhotos)
    )
    const nonFeaturedPhotoGroups = setPhotoWidth(
      nonFeaturedPhotos.slice(
        0,
        Math.max(0, loadPhotos - featuredPhotos.length)
      )
    )
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
