import { BASE_SITE_DESCRIPTION } from "./constants";
import { photoTitle, featureTitle } from "./title-service";

const name = "Mostly Animals";

function buildUrl({ selectedPhoto, feature }) {
  let url = "https://www.mostlyanimals.net";

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
  const selectedPhotoSize = selectedPhoto.resize.medium;
  const photoUrl = [selectedPhoto.baseUrl, selectedPhotoSize.path].join("/");

  return {
    "og:type": "article",
    "og:site_name": name,
    "og:title": feature ? featureTitle(featureName) : photoTitle(selectedPhoto),
    "og:url": buildUrl({ selectedPhoto, feature }),
    "og:description": selectedPhoto.description,
    "og:image": photoUrl,
    "og:image:width": selectedPhotoSize.width,
    "og:image:height": selectedPhotoSize.height,
  };
}

export function forAll() {
  return {
    "og:type": "article",
    "og:site_name": name,
    "og:title": featureTitle(featureName),
    "og:url": buildUrl({ feature }),
    "og:description": BASE_SITE_DESCRIPTION,
    "og:image": "https://www.mostlyanimals.net/static/images/logo.png",
    "og:image:width": 1300,
    "og:image:height": 616,
  };
}
