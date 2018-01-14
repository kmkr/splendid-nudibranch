import arrayIsEqual from './array-is-equal'

const lineProcessors = {
  tags: line => line.split(/\s/),
  fallback: line => line
}

function getMatchingPhoto (name, allPhotos) {
  return allPhotos.find(photo => photo.name === name)
}

function hasChanges (currentPhoto, allPhotos) {
  if (!currentPhoto.key) {
    return false
  }
  const matchingPhoto = getMatchingPhoto(currentPhoto.name, allPhotos)
  return Object.keys(currentPhoto).some(key => {
    const value = currentPhoto[key]

    if (Array.isArray(value)) {
      return !arrayIsEqual(value, matchingPhoto[key])
    } else {
      return value !== matchingPhoto[key]
    }
  })
}

export function map (content, photos) {
  const results = []
  let currentPhoto = {}
  const allowedExtensions = /\.(jpg|gif|png)$/
  const commentStart = '/'
  const lines = content.split('\n').filter(line => line && line[0] !== commentStart)

  while (lines.length) {
    const line = lines.shift().trim()

    if (line.toLowerCase().match(allowedExtensions)) {
      if (hasChanges(currentPhoto, photos)) {
        results.push(currentPhoto)
      }

      currentPhoto = {}
      const matchingPhoto = getMatchingPhoto(line, photos)

      if (!matchingPhoto) {
        console.log(`Expected to find photo with name ${line} in list of photos, but did not find it! Skipping photo.`)
        continue
      }

      currentPhoto.name = line
      currentPhoto.key = matchingPhoto.key
      continue
    }

    const split = line.split(/\s/)
    const lineKey = split[0].toLowerCase()

    if (lineKey) {
      const processor = lineProcessors[lineKey] || lineProcessors.fallback
      let lineVal = ''
      if (split.length > 1) {
        lineVal = split
                    .slice(1, split.length)
                    .filter(e => e)
                    .join(' ')
      }
      currentPhoto[lineKey] = processor(lineVal)

      if (lines.length === 0 && hasChanges(currentPhoto, photos)) {
        results.push(currentPhoto)
      }
      continue
    }

    throw new Error(`Expected empty line, file name or tab separated key. Found "${line}"`)
  }

  return results
}
