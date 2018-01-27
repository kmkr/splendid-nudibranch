/** @jsx h */
import { h, Component } from 'preact'

import Photo from './photo'
import Navigation from './navigation'

import KeyboardEventHandler from './keyboard-event-handler'

class PhotosWrapper extends Component {
  constructor() {
    super()
    this.onNextPhoto = this.onNextPhoto.bind(this)
    this.onPreviousPhoto = this.onPreviousPhoto.bind(this)
  }

  getCurrentPhotoIndex() {
    const { photos, selectedPhoto } = this.props
    return photos.indexOf(selectedPhoto) || 0
  }

  getNextPhoto() {
    const { photos } = this.props
    return photos[this.getCurrentPhotoIndex() + 1] || photos[0]
  }

  getPreviousPhoto() {
    const { photos } = this.props
    return photos[this.getCurrentPhotoIndex() - 1] || photos[photos.length - 1]
  }

  onNextPhoto(e) {
    if (e) {
      e.preventDefault()
    }
    this.props.onSelectPhoto(this.getNextPhoto())
  }

  onPreviousPhoto(e) {
    if (e) {
      e.preventDefault()
    }
    this.props.onSelectPhoto(this.getPreviousPhoto())
  }

  render() {
    const { selectedPhoto } = this.props
    return (
      <div>
        <KeyboardEventHandler
          onNext={this.onNextPhoto}
          onPrevious={this.onPreviousPhoto}
        />
        <Photo
          photo={selectedPhoto}
          next={
            <a
              href={`/photos/${this.getNextPhoto().key}`}
              class="click-next"
              onClick={this.onNextPhoto}
            />
          }
          previous={
            <a
              href={`/photos/${this.getPreviousPhoto().key}`}
              class="click-previous"
              onClick={this.onPreviousPhoto}
            />
          }
        />
        <Navigation onHome={this.props.onHome} />
      </div>
    )
  }
}

export default PhotosWrapper
