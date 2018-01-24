/** @jsx h */
import { h } from 'preact'

import PhotoText from './photo-text'
import Sidebar from './sidebar'
import TransitionImage from '../transition-image'
import buildSrcSet from './src-set-builder'

const Photo = ({ photo, onNext, onPrevious }) => (
  <div class={photo.mode}>
    <div class="photo-wrapper">
      <div class="photo-and-sidebar">
        <TransitionImage
          alt={photo.title}
          onClick={onNext}
          src={photo.sizes.large.url}
          srcSet={buildSrcSet(photo.sizes)}
          sizes="100vw"
        />
        <PhotoText photo={photo} />
        <Sidebar photo={photo} />
      </div>

      <div class="bottom-bar">
        <button onClick={onPrevious}>Previous</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  </div>
)

export default Photo
