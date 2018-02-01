/** @jsx h */
import { h, Component } from 'preact'

const TopLogo = ({ onGoToPhotos }) => (
  <div id="top-logo" onClick={onGoToPhotos}>
    <img src="/static/images/logo.svg" />
    <a href="#collage" class="arrow" />
  </div>
)

export default TopLogo
