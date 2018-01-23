/** @jsx h */
import { h, Component } from 'preact'

import Photo from './photo'
import setPhotoWidth from './set-width-helper'
import throttle from './throttle'
import getWidth from './get-width'

function hasScrollbar() {
  return document.body.offsetHeight >= window.innerHeight
}

class Collage extends Component {
  constructor() {
    super()

    this.state = {
      width: getWidth()
    }

    this.updateWidth = this.updateWidth.bind(this)
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

  render() {
    const { photos, onSelectPhoto } = this.props
    const photoGroups = setPhotoWidth(photos)
    const setDimensions = getWidth() > 1024
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
