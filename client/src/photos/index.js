/** @jsx h */
import { h, Component } from 'preact'

import TransitionImage from '../transition-image'

function buildSrcSet (sizes) {
  return Object.keys(sizes)
    .reverse()
    .map(key => {
      const size = sizes[key]
      return `${size.url} ${size.width}w`
    })
    .join(', ')
}

class Photo extends Component {
  render () {
    const { photo, onNext, onPrevious } = this.props
    const srcSet = buildSrcSet(photo.sizes)

    return (
      <div>
        <TransitionImage
          alt={photo.title}
          src={photo.sizes.large.url}
          sizes='(min-width: 1360px) 95vw, 100vw'
          srcSet={srcSet} />

        <p>{photo.title}</p>
        <p>{photo.latin}</p>
        <p>{photo.description}</p>
        <p>{photo.location}</p>

        <button onClick={onPrevious}>Previous</button>
        <button onClick={onNext}>Next</button>
      </div>
    )
  }
}

export default Photo
