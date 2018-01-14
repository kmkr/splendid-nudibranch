import React, {PropTypes} from 'react'

import './list-photos.scss'
import EditPhoto from './edit-photo'

const ListPhotos = ({photos, onDeleteClick}) => (
  <div className='list-photos'>
    {photos.map(photo => (
      <div
        key={photo.key}>
        <h3>{photo.name}</h3>
        <div className='entry'>
          <div className='thumb'>
            <img src={photo.sizes.thumb.url} />
          </div>
          <div className='form'>
            <EditPhoto
              onDeleteClick={onDeleteClick}
              photo={photo} />
          </div>
        </div>
      </div>
        ))}
  </div>
)

ListPhotos.propTypes = {
  photos: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
}

export default ListPhotos
