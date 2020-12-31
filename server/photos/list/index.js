const db = require("../../db");
const photoDataFormatter = require("../photo-data-formatter");

module.exports = () =>
  db.list("photos").then((photos) => {
    const sortedPhotos = photos.sort((p1, p2) => p1.order - p2.order);

    return photoDataFormatter.dbToClient(sortedPhotos);
  });
