import { useState, useEffect } from "react";
import Photo from "./photo";
import setPhotoWidth from "./set-width-helper";
import throttle from "./throttle";
import getWidth from "./get-width";
import MidWater from "./mid-water";

function hasScrollbar() {
  return document.body.offsetHeight >= window.innerHeight;
}

function isCollage() {
  // Will return false until document is present (client render). Requires a re-render!
  return getWidth() > 1100;
}

const PhotoGroup = ({ group }) => {
  const setDimensions = isCollage();
  const style = setDimensions ? { height: `${group.height}px` } : {};
  return (
    <div className="photo-group" key={`photo-group-${group.key}`} style={style}>
      {group.photos.map((photo) => (
        <Photo key={photo.key} setWidth={setDimensions} photo={photo} />
      ))}
    </div>
  );
};

const Collage = ({ featuredPhotos, nonFeaturedPhotos }) => {
  const [width, setWidth] = useState(null);

  function updateWidth() {
    setWidth(getWidth());
  }

  useEffect(() => {
    throttle("resize", "optimizedResize");
    window.addEventListener("optimizedResize", updateWidth);

    updateWidth();

    return function cleanup() {
      window.removeEventListener("optimizedResize", updateWidth);
    };
  }, []);

  const featuredPhotoGroups = setPhotoWidth(featuredPhotos);
  const nonFeaturedPhotoGroups = setPhotoWidth(nonFeaturedPhotos);
  return (
    <div id="collage">
      {featuredPhotoGroups.map((group) => (
        <PhotoGroup key={group.key} group={group} />
      ))}
      {!!featuredPhotoGroups.length && <MidWater />}
      {nonFeaturedPhotoGroups.map((group) => (
        <PhotoGroup key={group.key} group={group} />
      ))}
    </div>
  );
};

export default Collage;
