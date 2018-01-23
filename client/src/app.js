/** @jsx h */
import { h, Component } from 'preact'

import Collage from './collage'
import PhotosWrapper from './photos'

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
  }

  componentDidMount() {
    const { photos } = this.props
    window.addEventListener('popstate', e => {
      // e.state is equal to the data-attribute of the last image we clicked

      const photo = !!e.state && getPhotoWithKey(photos, e.state)
      this.setState({
        selectedPhoto: photo
      })
    })
  }

  onSelectPhoto(photo) {
    this.setState({
      selectedPhoto: photo
    })

    window.history.pushState(photo.key, '', `/photos/${photo.key}`)
    window.scrollTo(0, 0)
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
    return (
      <div>
        {selectedPhoto ? (
          <PhotosWrapper
            onNext={this.onNextPhoto}
            onPrevious={this.onPreviousPhoto}
            onSelectPhoto={this.onSelectPhoto}
            photos={photos}
            selectedPhoto={selectedPhoto}
          />
        ) : (
          <Collage photos={photos} onSelectPhoto={this.onSelectPhoto} />
        )}
      </div>
    )
  }
}

export default App
