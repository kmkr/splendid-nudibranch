const BASE_TITLE = "Mostly Animals";

module.exports.photoTitle = function (photo) {
  return [photo.title, BASE_TITLE].filter(Boolean).join(" :: ");
};

module.exports.featureTitle = function (featureName) {
  return [featureName, BASE_TITLE].filter(Boolean).join(" :: ");
};

module.exports.baseTitle = function () {
  return BASE_TITLE;
};
