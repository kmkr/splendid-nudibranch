export default function (sizes) {
  return Object.keys(sizes)
    .reverse()
    .map(key => {
      const size = sizes[key]
      return `${size.url} ${size.width}w`
    })
    .join(', ')
}
