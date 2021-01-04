export default function buildSrcSet(baseUrl, sizes) {
  return Object.keys(sizes)
    .map((key) => {
      const size = sizes[key];
      return `${baseUrl}/${size.path} ${size.width}w`;
    })
    .join(", ");
}
