const loaded = []

export function setLoaded(url) {
  loaded.push(url)
}

export function isLoaded(url) {
  return loaded.indexOf(url) !== -1
}
