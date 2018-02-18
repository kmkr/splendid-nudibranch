/** @jsx h */
import { h, Component } from 'preact'

import TopLogo from './top-logo'
import Collage from './collage'
import DeepWater from './deep-water'
import PhotosWrapper from './photos'
import { addAction, beaconStats } from './statistics'
import { getPosition, setPosition } from './scroll-location'
import { setTimeout } from 'timers'

function getPhotoWithKey(photos, key) {
  return photos.filter(p => p.key === key)[0]
}

class App extends Component {
  constructor(props) {
    super(props)

    const selectedPhotoKey = (window.location.href.match(/photos\/([^/]+)/) ||
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
          scrollToPrevPosition()
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
    const photoIsActive = !!this.state.selectedPhoto
    if (!photoIsActive) {
      setPosition()
    }
    this.setState({
      selectedPhoto: photo
    })

    window.history.pushState(photo.key, '', `/photos/${photo.key}`)
    addAction()
    setTimeout(() => {
      window.scroll({ top: 0, behavior: 'smooth' })
    })
  }

  scrollToPrevPosition() {
    const prevPosition = getPosition()
    setTimeout(() => {
      if (prevPosition) {
        window.scroll({ top: prevPosition })
      } else {
        this.onGoToPhotos()
      }
    })
  }

  onHome(e) {
    if (e) {
      e.preventDefault()
    }
    this.setState({
      selectedPhoto: null
    })

    window.history.pushState('frontpage', '', '/')
    addAction()
    scrollToPrevPosition()
  }

  onGoToPhotos(e, offset) {
    e && e.preventDefault()

    const y = document.querySelector('#top-logo').offsetHeight + (offset || 0)
    window.scroll({ top: y, behavior: 'smooth' })
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
    return selectedPhoto ? (
      <div id="container">
        <PhotosWrapper
          onHome={this.onHome}
          onSelectPhoto={this.onSelectPhoto}
          photos={photos}
          selectedPhoto={selectedPhoto}
        />
      </div>
    ) : (
      <div>
        <TopLogo onGoToPhotos={this.onGoToPhotos} />
        <div id="container">
          <Collage photos={photos} onSelectPhoto={this.onSelectPhoto} />
          <DeepWater onClick={e => this.onGoToPhotos(e, -100)} />
        </div>
      </div>
    )
  }
}

export default App
