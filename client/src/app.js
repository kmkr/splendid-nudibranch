/** @jsx h */
import {h, Component} from 'preact'

import Collage from './collage'
import Photo from './photos'

function getPhotoWithKey (photos, key) {
  return photos.filter(p => p.key === key)[0]
}

class App extends Component {
  constructor (props) {
    super(props)

    const selectedPhotoKey = (window.location.href.match(/photos\/([^/]+)/) || [])[1]
    this.state = {
      selectedPhoto: selectedPhotoKey ? getPhotoWithKey(this.props.photos, selectedPhotoKey) : null
    }
    this.onSelectPhoto = this.onSelectPhoto.bind(this)
    this.onNextPhoto = this.onNextPhoto.bind(this)
    this.onPreviousPhoto = this.onPreviousPhoto.bind(this)
  }

  componentDidMount () {
    const { photos } = this.props
    window.addEventListener('popstate', e => {
      // e.state is equal to the data-attribute of the last image we clicked

      const photo = !!e.state && getPhotoWithKey(photos, e.state)
      this.setState({
        selectedPhoto: photo
      })
    })
  }

  selectPhotoIndex (photoIndex) {
    this.onSelectPhoto(this.props.photos[photoIndex])
  }

  onSelectPhoto (photo) {
    this.setState({
      selectedPhoto: photo
    })

    window.history.pushState(photo.key, '', `/photos/${photo.key}`)
    window.scrollTo(0, 0)
  }

  getCurrentPhotoIndex () {
    const { selectedPhoto } = this.state
    if (!selectedPhoto) {
      return 0
    }

    const { photos } = this.props

    return photos.indexOf(selectedPhoto)
  }

  onNextPhoto () {
    const currentPhotoIndex = this.getCurrentPhotoIndex()
    const { photos } = this.props

    if (currentPhotoIndex === (photos.length - 1)) {
      this.selectPhotoIndex(0)
      return
    }

    this.selectPhotoIndex(Math.max(currentPhotoIndex + 1, 0))
  }

  onPreviousPhoto () {
    const currentPhotoIndex = this.getCurrentPhotoIndex()
    const { photos } = this.props

    if (currentPhotoIndex === 0) {
      this.selectPhotoIndex(photos.length - 1)
      return
    }

    this.selectPhotoIndex(Math.max(currentPhotoIndex - 1, 0))
  }

  render () {
    const { photos } = this.props
    const { selectedPhoto } = this.state
    return (
      <div>
        {selectedPhoto ? <Photo photo={selectedPhoto} onNext={this.onNextPhoto} onPrevious={this.onPreviousPhoto} /> : (
          <div style={{display: selectedPhoto ? 'none' : 'block'}}>
            <Collage photos={photos} onSelectPhoto={this.onSelectPhoto} />
          </div>
        )}
      </div>
    )
  }
}

export default App
