import { useState, useEffect } from "react";
import Photo from "./photo";
import setPhotoWidth from "./set-width-helper";
import throttle from "./throttle";
import getViewportWidth from "./get-width";
import MidWater from "./mid-water";

function hasScrollbar() {
  return document.body.offsetHeight >= window.innerHeight;
}

function isCollage() {
  return getViewportWidth() > 1100;
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
  // "null" as default state because the viewport width isn't known until the
  // code is rendered on the client.
  const [viewportWidth, setViewportWidth] = useState(null);

  function updateWidth() {
    setViewportWidth(getViewportWidth());
  }

  useEffect(() => {
    throttle("resize", "optimizedResize");
    window.addEventListener("optimizedResize", updateWidth);

    updateWidth();

    return function cleanup() {
      window.removeEventListener("optimizedResize", updateWidth);
    };
  }, []);

  if (!viewportWidth) {
    return null;
  }

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
