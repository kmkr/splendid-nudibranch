/** @jsx h */
import { h, Component } from 'preact'

import TransitionImage from '../transition-image'
import PhotoText from '../photos/photo-text'
import decorateLink from '../feature/decorate-link'

class Photo extends Component {
  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
    this.state = {
      inViewport: false
    }
  }

  componentDidMount() {
    const options = {
      root: null,
      rootMargin: '150px'
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setState({
            inViewport: true
          })
        }
      })
    }, options)
    observer.observe(this.domElem)
  }

  onClick(e) {
    e.preventDefault()
    this.props.onSelect(this.props.photo)
  }

  render({ photo, setWidth }, { inViewport }) {
    const style = {
      width: setWidth ? `${photo.displayedWidth}px` : '100%'
    }

    return (
      <div
        ref={domElem => (this.domElem = domElem)}
        class="photo"
        data-photo-key={photo.key}
        style={style}
      >
        <a href={decorateLink(`/photos/${photo.key}`)} onClick={this.onClick}>
          <div class="overlay-title-wrapper">
            <p class="title">{photo.title}</p>
            <p class="location">{photo.location}</p>
          </div>
          {inViewport && (
            <TransitionImage
              alt={photo.title}
              src={photo.sizes.xsmall.url}
              srcSet={photo.srcSet}
              sizes="(min-width: 1100px) 30vw, 100vw"
            />
          )}
        </a>

        <div className="sn-dn-ns sn-mb-l">
          <PhotoText photo={photo} />
        </div>
      </div>
    )
  }
}

export default Photo
