import { generalSiteDescription } from "./photos/constants";
import { photoTitle, featureTitle } from "../src/title-service";

const name = "The Splendid Nudibranch";

function buildUrl({ selectedPhoto, feature }) {
  let url = "https://www.thesplendidnudibranch.pink";

  if (selectedPhoto) {
    return url + `/photos/${selectedPhoto.key}`;
  }

  if (feature) {
    url += `/?feature=${feature.join("&feature=")}`;
  }

  return url;
}

// todo
const feature = null;
const featureName = null;

export function forOne(selectedPhoto) {
  const selectedPhotoSize = selectedPhoto.sizes.medium;

  return {
    "og:type": "article",
    "og:site_name": name,
    "og:title": feature ? featureTitle(featureName) : photoTitle(selectedPhoto),
    "og:url": buildUrl({ selectedPhoto, feature }),
    "og:description": selectedPhoto.description,
    "og:image": selectedPhotoSize.url,
    "og:image:width": selectedPhotoSize.width,
    "og:image:height": selectedPhotoSize.height,
  };
}

export function forAll(selectedPhoto) {
  return {
    "og:type": "article",
    "og:site_name": name,
    "og:title": featureTitle(featureName),
    "og:url": buildUrl({ feature }),
    "og:description": generalSiteDescription,
    "og:image": "https://www.thesplendidnudibranch.pink/static/images/logo.png",
    "og:image:width": 1300,
    "og:image:height": 616,
  };
}
