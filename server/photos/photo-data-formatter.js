function mapOne (photoFromDb) {
  const {title, description, latin, location, key, name, resize, tags} = photoFromDb
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
export function dbToClient (photoArg) {
  if (photoArg.constructor === Array) {
    return photoArg.map(mapOne)
  }

  return mapOne(photoArg)
}
