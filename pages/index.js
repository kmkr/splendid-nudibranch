import { useState, useEffect } from "react";

import MAHead from "../src/ma-head";
import Collage from "../src/collage/collage";
import { getPhotoData, getAllKeywords } from "../src/view-data-service";
import { serverToClient } from "../server/photos/photo-data-conversion";
import { forAll } from "../src/og-tags";
import buildSrcSet from "../src/photos/src-set-builder";
import TopLogo from "../src/top-logo";
import DeepWater from "../src/deep-water";
import { baseTitle } from "../src/title-service";
import { getLastShownPhotoKey } from "../src/last-shown-photo-service";
import { DEFAULT_VIEWPORT_WIDTH } from "../src/constants";

function scrollToPhoto(key, retryNum) {
  setTimeout(() => {
    const elem = document.querySelector(`[data-photo-key="${key}"]`);
    if (!elem) {
      if (retryNum < 3) {
        return this.scrollToPhoto(key, retryNum + 1);
      }
    }

    window.scroll({ top: elem.offsetTop - 50 });
  }, 50);
}

function onGoToPhotos(e, offset) {
  e && e.preventDefault();

  setTimeout(() => {
    const y = document.querySelector("#top-logo").offsetHeight + (offset || 0);
    window.scroll({ top: y, behavior: "smooth" });
  });
}

function HomePage({ keywords, photos }) {
  const [availWidth, setAvailWidth] = useState(DEFAULT_VIEWPORT_WIDTH);
  useEffect(() => {
    setAvailWidth(screen.availWidth);
  });

  useEffect(() => {
    const lastShownPhotoKey = getLastShownPhotoKey();
    if (!lastShownPhotoKey) {
      return;
    }

    scrollToPhoto(lastShownPhotoKey, 0);
  }, []);

  const photosWithSrcSet = photos.map((photo) => {
    photo.srcSet = buildSrcSet(photo.baseUrl, photo.resize, availWidth);
    return photo;
  });

  const featuredPhotos = photosWithSrcSet.filter((photo) => photo.featured);
  const nonFeaturedPhotos = photosWithSrcSet.filter((photo) => !photo.featured);

  return (
    <>
      <MAHead title={baseTitle()} keywords={keywords} meta={forAll()} />

      <TopLogo />

      <div id="container">
        <Collage
          featuredPhotos={featuredPhotos}
          nonFeaturedPhotos={nonFeaturedPhotos}
        />
        <DeepWater onClick={(e) => onGoToPhotos(e, -100)} />
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  return Promise.all([getPhotoData(), getAllKeywords()]).then(
    ([photos, allKeywords]) => {
      const mappedPhotos = photos.map(serverToClient);
      return {
        props: {
          keywords: allKeywords,
          photos: mappedPhotos,
        },
      };
    }
  );
}

export default HomePage;
