import Head from "next/head";
import { useEffect } from "react";

import Collage from "../client/collage";
import { getPhotoData, getAllKeywords } from "../server/view-data-service";
import { serverToClient } from "../server/photos/photo-data-conversion";
import { forAll } from "../server/og-tags";
import buildSrcSet from "../client/photos/src-set-builder";
import { baseTitle } from "../src/title-service";

function HomePage({ keywords, photos }) {
  let availWidth = 400;
  useEffect(() => {
    availWidth = screen.availWidth;
  });

  const photosWidthSrcSet = photos.map((photo) => {
    photo.srcSet = buildSrcSet(photo.sizes, availWidth);
    return photo;
  });

  const featuredPhotos = photos.filter((photo) => photo.featured);
  const nonFeaturedPhotos = photos.filter((photo) => !photo.featured);

  return (
    <>
      <Head>
        <title>{baseTitle()}</title>
        <meta name="keywords" content={keywords.join(", ")} />
        {Object.entries(forAll()).map(([key, value]) => (
          <meta key={key} property={key} content={value} />
        ))}
      </Head>

      <div id="container">
        <Collage
          featuredPhotos={featuredPhotos}
          nonFeaturedPhotos={nonFeaturedPhotos}
        />
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  return Promise.all([getPhotoData(), getAllKeywords()]).then(
    ([photoData, allKeywords]) => {
      const mappedPhotos = photoData.photos.map((p) =>
        serverToClient(p, photoData.base)
      );
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
