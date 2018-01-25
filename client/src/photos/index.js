/** @jsx h */
import { h, Component } from 'preact'

import Photo from './photo'
import Navigation from './navigation'

import ScrollOnEventHandler from './scroll-on-event-handler'

class PhotosWrapper extends Component {
  constructor() {
    super()
    this.onNextPhoto = this.onNextPhoto.bind(this)
    this.onPreviousPhoto = this.onPreviousPhoto.bind(this)
  }

  getCurrentPhotoIndex() {
    const { photos, selectedPhoto } = this.props
    if (!selectedPhoto) {
      return 0
    }

    return photos.indexOf(selectedPhoto)
  }

  onNextPhoto() {
    const currentPhotoIndex = this.getCurrentPhotoIndex()
    const { photos } = this.props

    if (currentPhotoIndex === photos.length - 1) {
      this.onSelectPhotoIndex(0)
      return
    }

    this.onSelectPhotoIndex(currentPhotoIndex + 1)
  }

  onPreviousPhoto() {
    const currentPhotoIndex = this.getCurrentPhotoIndex()
    const { photos } = this.props

    if (currentPhotoIndex === 0) {
      this.onSelectPhotoIndex(photos.length - 1)
      return
    }

    this.onSelectPhotoIndex(Math.max(currentPhotoIndex - 1, 0))
  }

  onSelectPhotoIndex(photoIndex) {
    this.props.onSelectPhoto(this.props.photos[photoIndex])
  }

  render() {
    const { selectedPhoto } = this.props
    return (
      <div>
        <ScrollOnEventHandler
          onNext={this.onNextPhoto}
          onPrevious={this.onPreviousPhoto}
        />
        <Photo onNext={this.onNextPhoto} photo={selectedPhoto}>
          <Navigation
            onNext={this.onNextPhoto}
            onPrevious={this.onPreviousPhoto}
            onHome={this.props.onHome}
          />
        </Photo>
      </div>
    )
  }
}

export default PhotosWrapper
