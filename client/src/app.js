/** @jsx h */
import { h, Component } from 'preact'

import Collage from './collage'
import DeepWater from './deep-water'
import PhotosWrapper from './photos'
import { addAction, beaconStats } from './statistics'

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
  }

  componentDidMount() {
    const { photos } = this.props
    window.addEventListener('popstate', e => {
      const photo = !!e.state && getPhotoWithKey(photos, e.state)
      this.setState({
        selectedPhoto: photo
      })
    })

    window.addEventListener('unload', () => {
      beaconStats()
    })
  }

  onSelectPhoto(photo) {
    this.setState({
      selectedPhoto: photo
    })

    window.history.pushState(photo.key, '', `/photos/${photo.key}`)
    window.scroll({ top: 0, behavior: 'smooth' })
    addAction()
  }

  onHome(e) {
    if (e) {
      e.preventDefault()
    }

    this.setState({
      selectedPhoto: null
    })

    window.history.pushState(null, '', '/')
    window.scroll({ top: 0, behavior: 'smooth' })
    addAction()
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
      <PhotosWrapper
        onHome={this.onHome}
        onSelectPhoto={this.onSelectPhoto}
        photos={photos}
        selectedPhoto={selectedPhoto}
      />
    ) : (
      <div>
        <Collage photos={photos} onSelectPhoto={this.onSelectPhoto} />
        <DeepWater onHome={this.onHome} />
      </div>
    )
  }
}

export default App
