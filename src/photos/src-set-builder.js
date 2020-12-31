export default function srcSetBuilder(baseUrl, sizes, availWidth) {
  let passedAvail = false;

  return Object.keys(sizes)
    .filter((key) => {
      const size = sizes[key];
      if (size.width < availWidth) {
        return true;
      }

      if (passedAvail) {
        return false;
      }

      passedAvail = true;
      return true;
    })
    .map((key) => {
      const size = sizes[key];
      return `${baseUrl}/${size.path} ${size.width}w`;
    })
    .join(", ");
}
