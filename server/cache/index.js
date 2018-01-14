let cache = {}

export function get (key) {
  return cache[key]
}

export function put (key, val) {
  cache[key] = val
}

export function clear () {
  cache = {}
}
