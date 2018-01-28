export const setNumLoaded = numLoaded => {
  window.snNumLoadedPhotos = numLoaded
}

export const getNumLoaded = () => {
  return window.snNumLoadedPhotos || 0
}
