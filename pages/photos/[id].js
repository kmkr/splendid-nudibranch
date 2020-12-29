import Head from "next/head";
import { useEffect, useState } from "react";

import {
  getPhotoData,
  getKeywordsForPhoto,
} from "../../server/view-data-service";
import { serverToClient } from "../../server/photos/photo-data-conversion";
import { forOne } from "../../server/og-tags";
import buildSrcSet from "../../client/photos/src-set-builder";
import PhotoWrapper from "../../client/photos";
import { photoTitle } from "../../src/title-service";
import { setLastShownPhotoKey } from "../../src/last-shown-photo-service";

function PhotoPage({ keywords, photo, nextPhoto, prevPhoto }) {
  const [availWidth, setAvailWidth] = useState(400);

  useEffect(() => {
    setAvailWidth(screen.availWidth);
    setLastShownPhotoKey(photo.key);
  });

  photo.srcSet = buildSrcSet(photo.sizes, availWidth);
  nextPhoto.srcSet = buildSrcSet(nextPhoto.sizes, availWidth);
  prevPhoto.srcSet = buildSrcSet(prevPhoto.sizes, availWidth);

  return (
    <>
      <Head>
        <title>{photoTitle(photo)}</title>
        <meta name="keywords" content={keywords.join(", ")} />
        {Object.entries(forOne(photo)).map(([key, value]) => (
          <meta key={key} property={key} content={value} />
        ))}
      </Head>

      <div id="container">
        <PhotoWrapper
          nextPhoto={nextPhoto}
          prevPhoto={prevPhoto}
          selectedPhoto={photo}
        />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const allPhotos = await getPhotoData();
  return {
    paths: allPhotos.photos.map((photo) => ({
      params: {
        id: photo.key,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { photos, base } = await getPhotoData();

  const selectedPhotoIndex = photos.findIndex(
    (photo) => photo.key === context.params.id
  );
  const selectedPhoto = photos[selectedPhotoIndex];

  if (!selectedPhoto) {
    return {
      notFound: true,
    };
  }

  const photoKeywords = getKeywordsForPhoto(selectedPhoto);

  const nextPhotoIndex =
    selectedPhotoIndex === photos.length - 1 ? 0 : selectedPhotoIndex + 1;
  const prevPhotoIndex =
    selectedPhotoIndex === 0 ? photos.length - 1 : selectedPhotoIndex - 1;

  const nextPhoto = photos[nextPhotoIndex];
  const prevPhoto = photos[prevPhotoIndex];

  return {
    props: {
      keywords: photoKeywords,
      photo: serverToClient(selectedPhoto, base),
      nextPhoto: serverToClient(nextPhoto, base),
      prevPhoto: serverToClient(prevPhoto, base),
    },
  };
}

export default PhotoPage;
