/** @jsx h */
import { h, Component } from 'preact'

import TopLogo from './top-logo'
import Collage from './collage'
import DeepWater from './deep-water'
import PhotosWrapper from './photos'
import { addAction, beaconStats } from './statistics'
import { setTimeout } from 'timers'
import decorateLink from './feature/decorate-link'

function getPhotoWithKey(photos, key) {
  return photos.filter(p => p.key === key)[0]
}

class App extends Component {
  constructor(props) {
    super(props)

    const selectedPhotoKey = (window.location.href.match(/photos\/([^/?]+)/) ||
      [])[1]
    this.state = {
      selectedPhoto: selectedPhotoKey
        ? getPhotoWithKey(this.props.photos, selectedPhotoKey)
        : null
    }
    this.onSelectPhoto = this.onSelectPhoto.bind(this)
    this.onHome = this.onHome.bind(this)
    this.onGoToPhotos = this.onGoToPhotos.bind(this)
  }

  componentDidMount() {
    const { photos } = this.props
    window.addEventListener('popstate', e => {
      const photo = getPhotoWithKey(photos, e.state)

      // Workaround for old Safaris popping state on first load
      if (e.state || this.forcePopActivation) {
        this.setState({
          selectedPhoto: photo
        })

        if (!photo) {
          this.onGoToPhotos()
        }
      }
    })

    window.addEventListener('unload', () => {
      beaconStats()
    })

    setTimeout(() => {
      this.forcePopActivation = true
    }, 50)
  }

  onSelectPhoto(photo) {
    this.setState({
      selectedPhoto: photo
    })

    window.history.pushState(
      photo.key,
      '',
      decorateLink(`/photos/${photo.key}`)
    )
    addAction()
    setTimeout(() => {
      window.scroll({ top: 0, behavior: 'smooth' })
    })
  }

  scrollToPhoto(key, retryNum) {
    setTimeout(() => {
      const elem = document.querySelector(`[data-photo-key="${key}"]`)
      if (!elem) {
        if (retryNum < 3) {
          return this.scrollToPhoto(key, retryNum + 1)
        }
        return this.onGoToPhotos()
      }

      window.scroll({ top: elem.offsetTop - 50 })
    }, 50)
  }

  onHome(e) {
    if (e) {
      e.preventDefault()
    }
    const { selectedPhoto } = this.state
    const selectedPhotoKey = selectedPhoto ? selectedPhoto.key : null
    this.setState({
      selectedPhoto: null
    })

    window.history.pushState('frontpage', '', decorateLink('/'))
    addAction()
    this.scrollToPhoto(selectedPhotoKey, 0)
  }

  onGoToPhotos(e, offset) {
    e && e.preventDefault()

    setTimeout(() => {
      const y = document.querySelector('#top-logo').offsetHeight + (offset || 0)
      window.scroll({ top: y, behavior: 'smooth' })
    })
  }

  getCurrentPhotoIndex() {
    const { selectedPhoto } = this.state
    if (!selectedPhoto) {
      return 0
    }

    const { photos } = this.props

    return photos.indexOf(selectedPhoto)
  }

  render() {
    const { photos } = this.props
    const { selectedPhoto } = this.state
    const featuredPhotos = photos.filter(photo => photo.featured)
    const nonFeaturedPhotos = photos.filter(photo => !photo.featured)
    return selectedPhoto ? (
      <div id="container">
        <PhotosWrapper
          onHome={this.onHome}
          onChangePhoto={this.onSelectPhoto}
          photos={featuredPhotos.concat(nonFeaturedPhotos)}
          selectedPhoto={selectedPhoto}
        />
      </div>
    ) : (
      <div>
        <TopLogo onGoToPhotos={this.onGoToPhotos} />
        <div id="container">
          <Collage
            featuredPhotos={featuredPhotos}
            nonFeaturedPhotos={nonFeaturedPhotos}
            onSelectPhoto={this.onSelectPhoto}
          />
          <DeepWater onClick={e => this.onGoToPhotos(e, -100)} />
        </div>
      </div>
    )
  }
}

export default App
