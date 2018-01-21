/** @jsx h */
import {h, Component} from 'preact'

import Photo from './photo'
import setPhotoWidth from './set-width-helper'
import throttle from './throttle'

class Collage extends Component {
  constructor () {
    super()

    this.state = {
      innerWidth: window.innerWidth
    }

    this.updateWidth = this.updateWidth.bind(this)
  }

  updateWidth () {
    this.setState({
      innerWidth: window.innerWidth
    })
  }

  componentDidMount () {
    throttle("resize", "optimizedResize");
    window.addEventListener("optimizedResize", this.updateWidth)
  }

  componentWillUnmount () {
    window.removeEventListener("optimizedResize", this.updateWidth)
  }

  render () {
    const { photos, onSelectPhoto } = this.props
    const photoGroups = setPhotoWidth(photos)
    return (
      <div id='collage'>
        {photoGroups.map((photoGroup, index) => (
          <div key={`photo-group-${index}`} style={{ maxHeight: `${photoGroup.height}px` }}>
            {photoGroup.photos.map(photo => <Photo key={photo.key} photo={photo} onSelect={onSelectPhoto} />)}
          </div>
        ))}
      </div>
    )
  }
}

export default Collage
