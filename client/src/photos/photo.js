/** @jsx h */
import { h } from 'preact'

import PhotoText from './photo-text'
import Sidebar from './sidebar'
import TransitionImage from '../transition-image'
import buildSrcSet from './src-set-builder'

const Photo = ({ children, next, previous, photo }) => (
  <div class={`photo-and-navigation ${photo.mode}`}>
    {previous}
    {next}
    <div class="photo-wrapper">
      <div class="photo-and-sidebar">
        <TransitionImage
          alt={photo.title}
          src={photo.sizes.large.url}
          srcSet={buildSrcSet(photo.sizes)}
          sizes="100vw"
        />
        <PhotoText photo={photo} />
        <Sidebar photo={photo} />
      </div>
    </div>
    {children}
  </div>
)

export default Photo
