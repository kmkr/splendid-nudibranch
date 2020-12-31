import listPhotos from "../server/photos/list";

export function getPhotoData() {
  return listPhotos();
}

const stopWords = [/\d{4}/];

function noStopWords(elem) {
  return !stopWords.some((sw) => sw.test(elem));
}

function onlyUnique(value, index, ary) {
  return ary.indexOf(value) === index;
}

function reduceFlatten(a, b) {
  return a.concat(b);
}

export function getKeywordsForPhoto(photo) {
  return [photo.title, ...(photo.location || "").split(", "), ...photo.tags]
    .filter(noStopWords)
    .filter((t) => t);
}

export function getAllKeywords() {
  return getPhotoData().then(({ photos }) =>
    [
      "diving",
      "scuba",
      "underwater",
      "photography",
      "fish",
      "nudibranch",
      "crab",
      "shrimp",
      "shark",
      "macro",
      ...photos
        // Location tags are separated by commas - I want all such word groups to be candidates for unique filter so that "The Philippines", "Pandan Island, The Philippines" and "Apo Reef, The Philippines" ends up as three separate keywords "Pandan Island", "Apo Reef" and "The Philippines"
        .map((p) => (p.location || "").split(", "))
        .reduce(reduceFlatten, []),
      ...photos
        .map((p) => p.tags)
        .reduce(reduceFlatten, [])
        .filter(noStopWords),
    ]
      .filter(onlyUnique)
      .filter((t) => t)
  );
}
