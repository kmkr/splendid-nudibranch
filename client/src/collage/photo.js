/** @jsx h */
import { h, Component } from 'preact'

import TransitionImage from '../transition-image'

class Photo extends Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }
  onClick (e) {
    e.preventDefault()
    this.props.onSelect(this.props.photo)
  }

  render () {
    const { photo } = this.props
    return (
      <a href={`/photos/${photo.key}`}
        onClick={this.onClick}
        className='collage-item'
        style={{ width: `${photo.displayedWidth}px` }}>
        <TransitionImage
          alt={photo.title}
          src={photo.sizes.xsmall.url} />
      </a>
    )
  }
}

export default Photo
