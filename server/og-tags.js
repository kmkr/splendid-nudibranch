const { description } = require('./photos/constants')

const name = 'The Splendid Nudibranch'

function buildUrl({ selectedPhotoKey, feature, featuredPhoto }) {
  let url = 'http://www.thesplendidnudibranch.pink'

  if (selectedPhotoKey) {
    return url + `/photos/${selectedPhotoKey}`
  }

  if (feature) {
    url += `/?feature=${feature.join('&feature=')}`
    if (featuredPhoto) {
      return url + `&fp=${featuredPhoto}`
    }
  }

  return url
}

module.exports = (
  photos,
  { selectedPhotoKey, feature, featureName, featuredPhoto }
) => {
  const selectedPhoto = photos.filter(
    p => p.key === (selectedPhotoKey || featuredPhoto)
  )[0]

  if (selectedPhoto) {
    const selectedPhotoSize = selectedPhoto.sizes.medium

    return {
      'og:type': 'article',
      'og:site_name': name,
      'og:title': [feature ? featureName : selectedPhoto.title, name]
        .filter(Boolean)
        .join(' :: '),
      'og:url': buildUrl({ selectedPhotoKey, feature, featuredPhoto }),
      'og:description': featuredPhoto ? description : selectedPhoto.description,
      'og:image': selectedPhotoSize.url,
      'og:image:width': selectedPhotoSize.width,
      'og:image:height': selectedPhotoSize.height
    }
  }

  return {
    'og:type': 'article',
    'og:site_name': name,
    'og:title': [featureName, name].filter(Boolean).join(' :: '),
    'og:url': buildUrl({ feature }),
    'og:description': description,
    'og:image': 'http://www.thesplendidnudibranch.pink/static/images/logo.png',
    'og:image:width': 1300,
    'og:image:height': 616
  }
}
