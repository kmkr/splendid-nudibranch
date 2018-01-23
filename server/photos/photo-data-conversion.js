const { resizeTo } = require('../../common/constants')

function buildUrl(base, key, name, size) {
  return `${base}/${key}/${size}_${encodeURIComponent(name)}`
}

function getMode(resizeData) {
  const { width, height } = resizeData[Object.keys(resizeData)[0]]

  return width > height ? 'landscape' : 'portrait'
}

module.exports.serverToClient = function(photo, base) {
  return {
    name: photo.name,
    key: photo.key,
    title: photo.title,
    description: photo.description,
    latin: photo.latin,
    location: photo.location,
    tags: photo.tags,
    mode: getMode(photo.resize),
    sizes: resizeTo.reduce((prev, current) => {
      if (!photo.resize[current.name]) {
        console.log(`Warning: missing size ${current.name} for ${photo.name}`)
        return prev
      }

      return {
        ...prev,
        [current.name]: {
          url: buildUrl(base, photo.key, photo.name, current.shortName),
          width: photo.resize[current.name].width,
          height: photo.resize[current.name].height
        }
      }
    }, {})
  }
}
