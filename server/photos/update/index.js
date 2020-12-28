const db = require("../../db");
const photoDataFormatter = require("../photo-data-formatter");

module.exports = (key, newValues) => {
  return db
    .update("photos", { key }, newValues)
    .then((updatedPhoto) => photoDataFormatter.dbToClient(updatedPhoto));
};
