import getWidth from './get-width'

function getNumPortrait (photos) {
  return photos.filter(photo => photo.mode === 'portrait').length
}

export default function (_photos) {
  const photos = [..._photos]
  const totalWidth = Math.min(getWidth(), 2560)
  const groups = []

  while (photos.length) {
    const subGroup = {
      height: null,
      photos: []
    }
    let numThisRow = 3
    let portraitScaleFactor = 1
    let landscapeScaleFactor = 1
    const numNext5 = getNumPortrait(photos.slice(0, 5))

    if (numNext5 && numNext5 < 5) {
      const numNext4 = getNumPortrait(photos.slice(0, 4))
      const numNext3 = getNumPortrait(photos.slice(0, 3))

      if (numNext5 === 4) {
                // ??
        numThisRow = 5
      } else if (numNext5 === 3) {
        numThisRow = 5
        portraitScaleFactor = 0.6
        landscapeScaleFactor = 1.3
      } else if (numNext4 === 2) {
        numThisRow = 4
        portraitScaleFactor = 0.6
        landscapeScaleFactor = 1.35
      } else if (numNext3 === 1) {
        portraitScaleFactor = 0.5
        landscapeScaleFactor = 1.2
      }
    }

    for (let i = 0; i < numThisRow; i++) {
      const photoToAdd = photos.shift()
      if (!photoToAdd) {
        return groups
      }
      const scale = photoToAdd.mode === 'portrait' ? portraitScaleFactor : landscapeScaleFactor

      const marginsInRow = (numThisRow + 1) * 8
      photoToAdd.displayedWidth = ((totalWidth - marginsInRow) / numThisRow) * scale
      subGroup.photos.push(photoToAdd)
      const ratio = photoToAdd.sizes.small.height / photoToAdd.sizes.small.width
      const height = photoToAdd.displayedWidth * ratio
      subGroup.height = subGroup.height ? Math.min(subGroup.height, height) : height
            // next row
    }
    groups.push(subGroup)
  }

  return groups
}
