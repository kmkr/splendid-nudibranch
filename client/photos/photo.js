import { useEffect } from "react";

import PhotoText from "./photo-text";
import TransitionImage from "../transition-image";

function sizes(photo) {
  return photo.mode === "portrait"
    ? "(min-width: 1100px) 50vw, 100vw"
    : "(min-width: 1100px) 95vw, 100vw";
}

let timeout;

function preload(photos) {
  if (timeout) {
    window.clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
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

const Photo = ({ next, previous, photo, preloadPhotos }) => {
  useEffect(() => {
    preload(preloadPhotos);
  }, [preloadPhotos]);
  return (
    <div className={photo.mode}>
      <div className="photo-and-text">
        {/* <div className="photo-wrapper" ref={(el) => (this.el = el)}> */}
        <div className="photo-wrapper">
          {previous}
          {next}
          <img alt={photo.title} srcSet={photo.srcSet} sizes={sizes(photo)} />
        </div>
        <PhotoText photo={photo} />
      </div>
    </div>
  );
};

// componentWillUnmount() {
//   if (this.el) {
//     this.el.removeChild(this.el.querySelector("img"));
//   }
// }

export default Photo;
