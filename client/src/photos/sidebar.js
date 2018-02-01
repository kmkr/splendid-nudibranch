/** @jsx h */
import { h, Component } from 'preact'

import PhotoText from './photo-text'

const Sidebar = ({ expanded, photo, onToggleExpanded }) => (
  <div id="sidebar-wrapper" class={photo.mode}>
    <div id="sidebar">
      <div className={expanded ? 'expanded' : ''}>
        <a
          href="#"
          title={expanded ? 'Close info box' : 'Read more about this photo'}
          tabIndex="0"
          aria-role="button"
          onClick={onToggleExpanded}
        >
          <span class="one" />
          <span class="two" />
        </a>
      </div>
    </div>

    <div id="sidebar-text" class={expanded ? 'expanded' : ''}>
      <PhotoText photo={photo} />
    </div>
  </div>
)

export default Sidebar
