/** @jsx h */
import {h} from 'preact'

import TransitionImage from '../transition-image'
import setPhotoWidth from './set-width-helper'

const Collage = ({photos}) => {
  const photoGroups = setPhotoWidth(photos)
  return (
    <div id='collage'>
      {photoGroups.map((photoGroup, index) => (
        <div key={`photo-group-${index}`} style={{maxHeight: `${photoGroup.height}px`}}>
          {photoGroup.photos.map(photo => (
            <div key={photo.key}
              className='collage-item'
              style={{width: `${photo.displayedWidth}px`}}>
              <TransitionImage
                alt={photo.title}
                src={photo.sizes.xsmall.url} />
            </div>
                    ))}
        </div>
            ))}
    </div>
  )
}

export default Collage
