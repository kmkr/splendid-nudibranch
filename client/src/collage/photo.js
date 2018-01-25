/** @jsx h */
import { h, Component } from 'preact'

import TransitionImage from '../transition-image'
import PhotoText from '../photos/photo-text'
import buildSrcSet from '../photos/src-set-builder'

class Photo extends Component {
  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
  }
  onClick(e) {
    e.preventDefault()
    this.props.onSelect(this.props.photo)
  }

  render() {
    const { photo, setWidth } = this.props
    const style = setWidth ? { width: `${photo.displayedWidth}px` } : {}
    return (
      <div style={style}>
        <a href={`/photos/${photo.key}`} onClick={this.onClick}>
          <TransitionImage
            alt={photo.title}
            src={photo.sizes.xsmall.url}
            srcSet={buildSrcSet(photo.sizes)}
            sizes="(min-width: 1100px) 30vw, 100vw"
          />
        </a>

        <div className="sn-dn-ns sn-mb-l">
          <PhotoText photo={photo} />
        </div>
      </div>
    )
  }
}

export default Photo
