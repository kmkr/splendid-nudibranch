/** @jsx h */
import { h, Component } from 'preact'

import Photo from './photo'
import Navigation from './navigation'
import Sidebar from './sidebar'

import KeyboardEventHandler from './keyboard-event-handler'

class PhotosWrapper extends Component {
  constructor() {
    super()
    this.onNextPhoto = this.onNextPhoto.bind(this)
    this.onPreviousPhoto = this.onPreviousPhoto.bind(this)
    this.onToggleExpandSidebar = this.onToggleExpandSidebar.bind(this)
    this.state = {
      sidebarExpanded: true
    }
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
    e && e.preventDefault()
    this.props.onSelectPhoto(this.getNextPhoto())
  }

  onPreviousPhoto(e) {
    e && e.preventDefault()
    this.props.onSelectPhoto(this.getPreviousPhoto())
  }

  onToggleExpandSidebar(e) {
    e && e.preventDefault()
    this.setState(prevState => ({
      sidebarExpanded: !prevState.sidebarExpanded
    }))
  }

  render() {
    const { selectedPhoto } = this.props
    const nextPhoto = this.getNextPhoto()
    return (
      <div>
        <KeyboardEventHandler
          onNext={this.onNextPhoto}
          onPrevious={this.onPreviousPhoto}
          onToggleSidebar={this.onToggleExpandSidebar}
        />
        <Photo
          photo={selectedPhoto}
          preloadPhoto={nextPhoto}
          next={
            <a
              href={`/photos/${nextPhoto.key}`}
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
        <Sidebar
          expanded={this.state.sidebarExpanded}
          onToggleExpanded={this.onToggleExpandSidebar}
          photo={selectedPhoto}
        />
        <Navigation onHome={this.props.onHome} />
      </div>
    )
  }
}

export default PhotosWrapper
