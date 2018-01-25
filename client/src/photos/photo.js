/** @jsx h */
import { h } from 'preact'

import PhotoText from './photo-text'
import Sidebar from './sidebar'
import TransitionImage from '../transition-image'
import buildSrcSet from './src-set-builder'

const Photo = ({ children, onNext, photo }) => (
  <div class={`photo-and-navigation ${photo.mode}`}>
    <div class="photo-wrapper">
      <div class="photo-and-sidebar">
        <div class="photo-and-children">
          <TransitionImage
            alt={photo.title}
            onClick={onNext}
            src={photo.sizes.large.url}
            srcSet={buildSrcSet(photo.sizes)}
            sizes="100vw"
          />
        </div>
        <PhotoText photo={photo} />
        <Sidebar photo={photo} />
      </div>

      <div class="bottom-bar" />
    </div>
    {children}
  </div>
)

export default Photo
