import Head from "next/head";
import { useEffect } from "react";

import {
  getPhotoData,
  getKeywordsForPhoto,
} from "../../server/view-data-service";
import { serverToClient } from "../../server/photos/photo-data-conversion";
import { forOne } from "../../server/og-tags";
import buildSrcSet from "../../client/photos/src-set-builder";
import PhotoWrapper from "../../client/photos";
import { photoTitle } from "../../src/title-service";

function PhotoPage({ keywords, photo }) {
  let availWidth = 400;
  useEffect(() => {
    availWidth = screen.availWidth;
  });

  photo.srcSet = buildSrcSet(photo.sizes, availWidth);

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
        <PhotoWrapper selectedPhoto={photo} />
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
  const photoData = await getPhotoData();

  const selectedPhoto = photoData.photos.find(
    (photo) => photo.key === context.params.id
  );
  if (!selectedPhoto) {
    return {
      notFound: true,
    };
  }

  const photoKeywords = getKeywordsForPhoto(selectedPhoto);
  const mappedPhoto = serverToClient(selectedPhoto, photoData.base);

  return {
    props: {
      keywords: photoKeywords,
      photo: mappedPhoto,
    },
  };
}

export default PhotoPage;
