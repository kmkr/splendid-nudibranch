/** @jsx h */
import { h, Component } from 'preact'

const TopLogo = ({ onGoToPhotos }) => (
  <div id="top-logo">
    <img src="/static/images/logo.svg" />
    <a href="#collage" class="arrow" onClick={onGoToPhotos} />
  </div>
)

export default TopLogo
