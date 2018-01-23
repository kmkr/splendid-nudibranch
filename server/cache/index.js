let cache = {}

module.exports.get = function(key) {
  return cache[key]
}

module.exports.put = function(key, val) {
  cache[key] = val
}

module.exports.clear = function() {
  cache = {}
}
