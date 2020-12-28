/** @jsx h */
import { h, Component } from "../admin/preact";

const TopLogo = ({ onGoToPhotos }) => (
  <div id="top-logo" onClick={onGoToPhotos}>
    <img src="/static/images/logo.svg" />
    <a href="#collage" className="arrow" />
  </div>
);

export default TopLogo;
