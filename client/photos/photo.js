import { PureComponent } from "react";

import PhotoText from "./photo-text";
import TransitionImage from "../transition-image";

function sizes(photo) {
  return photo.mode === "portrait"
    ? "(min-width: 1100px) 50vw, 100vw"
    : "(min-width: 1100px) 95vw, 100vw";
}

class Photo extends PureComponent {
  constructor(props) {
    super();
    this.preload(props.preloadPhotos);
  }

  componentDidUpdate() {
    const { preloadPhotos } = this.props;
    this.preload(preloadPhotos);
  }

  componentWillUnmount() {
    if (this.el) {
      this.el.removeChild(this.el.querySelector("img"));
    }
  }

  preload(photos) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      photos.forEach((photo, index) => {
        const image = new Image();
        image.src = photo.sizes.large.url;
        image.setAttribute("srcset", photo.srcSet);
        image.setAttribute("sizes", sizes(photo));
        const key = `snPreloadedPhoto${index}`;
        window[key] = image;
      });
    }, 1000);
  }

  render() {
    const { next, previous, photo } = this.props;
    return (
      <div className={photo.mode}>
        <div className="photo-and-text">
          <div className="photo-wrapper" ref={(el) => (this.el = el)}>
            {previous}
            {next}
            <img alt={photo.title} srcSet={photo.srcSet} sizes={sizes(photo)} />
          </div>
          <PhotoText photo={photo} />
        </div>
      </div>
    );
  }
}

export default Photo;
