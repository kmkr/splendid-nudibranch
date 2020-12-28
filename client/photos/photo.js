import { useEffect, useRef } from "react";

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
  const wrapperRef = useRef();

  useEffect(() => {
    preload(preloadPhotos);
  }, [preloadPhotos]);

  useEffect(() => {
    // Clean up to avoid having images "hanging" when navigating to a new image.
    return function cleanup() {
      wrapperRef.current.removeChild(wrapperRef.current.querySelector("img"));
    };
  }, []);

  return (
    <div className={photo.mode}>
      <div className="photo-and-text">
        <div className="photo-wrapper" ref={wrapperRef}>
          {previous}
          {next}
          <img alt={photo.title} srcSet={photo.srcSet} sizes={sizes(photo)} />
        </div>
        <PhotoText photo={photo} />
      </div>
    </div>
  );
};

export default Photo;
