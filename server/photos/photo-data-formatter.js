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
    shotAt: shot_at,
    createdAt: created_at,
    updatedAt: updated_at,
    tags: tags || []
  }
}
module.exports.dbToClient = function(photoArg) {
  if (Array.isArray(photoArg)) {
    return photoArg.map(mapOne)
  }

  return mapOne(photoArg)
}
