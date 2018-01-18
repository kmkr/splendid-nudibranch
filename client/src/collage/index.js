/** @jsx h */
import {h} from 'preact'

import Photo from './photo'
import setPhotoWidth from './set-width-helper'

const Collage = ({ photos, onSelectPhoto }) => {
  const photoGroups = setPhotoWidth(photos)
  return (
    <div id='collage'>
      {photoGroups.map((photoGroup, index) => (
        <div key={`photo-group-${index}`} style={{ maxHeight: `${photoGroup.height}px` }}>
          {photoGroup.photos.map(photo => <Photo key={photo.key} photo={photo} onSelect={onSelectPhoto} />)}
        </div>
      ))}
    </div>
  )
}

export default Collage
