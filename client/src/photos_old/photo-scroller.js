import React, {PureComponent, PropTypes} from 'react'

import ListPhotos from './list-photos'

class PhotoScroller extends PureComponent {
  render () {
    const {onPhotoLoad, photos} = this.props

    return (
      <div id='photo-scroller'>
        <ListPhotos
          onPhotoLoad={onPhotoLoad}
          photos={photos} />

        <div ref='photo-list-wrapper' />
      </div>
    )
  }
}

PhotoScroller.propTypes = {
  onPhotoLoad: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired
}

export default PhotoScroller
