/** @jsx h */
import { h, Component } from 'preact'

import Photo from './photo'
import setPhotoWidth from './set-width-helper'
import throttle from './throttle'
import getWidth from './get-width'
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

    if (!isCollage) {
      throttle('scroll', 'optimizedScroll')
      window.addEventListener('optimizedScroll', this.updateLoadedPhotos)
    }
    this.state = {
      width: getWidth(),
      // Old devices (at least old iPads) breaks if all photos are loaded at once. Load only 8 photos at a time.p
      loadPhotos: isCollage ? props.photos.length : Math.max(3, getNumLoaded())
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
      const newNumLoadedPhotos = Math.min(
        this.state.loadPhotos + 2,
        this.props.photos.length
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

  render({ photos, onSelectPhoto }, { loadPhotos }) {
    const photoGroups = setPhotoWidth(photos.slice(0, loadPhotos))
    const setDimensions = getIsCollage()
    return (
      <div id="collage">
        {photoGroups.map((photoGroup, index) => {
          const style = setDimensions
            ? { height: `${photoGroup.height}px` }
            : {}
          return (
            <div key={`photo-group-${index}`} style={style}>
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
        })}
      </div>
    )
  }
}

export default Collage
