function mapOne(photoFromDb) {
  const {
    title,
    description,
    latin,
    location,
    key,
    name,
    resize,
    shot_at,
    created_at,
    updated_at,
    tags
  } = photoFromDb
  return {
    title,
    description,
    latin,
    location,
    key,
    name,
    resize,
    tags: tags || []
  }
}
module.exports.dbToClient = function(photoArg) {
  if (photoArg.constructor === Array) {
    return photoArg.map(mapOne)
  }

  return mapOne(photoArg)
}
