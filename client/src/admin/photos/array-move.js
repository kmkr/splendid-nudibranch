export default function(arr, curIndex, newIndex) {
  if (newIndex >= arr.length) {
    var k = newIndex - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }
  arr.splice(newIndex, 0, arr.splice(curIndex, 1)[0])
  return arr
}
