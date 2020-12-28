const DEFAULT_WIDTH = 500;

export default function () {
  if (typeof document !== "undefined") {
    return (
      document.scrollWidth || document.body.clientWidth || window.innerWidth
    );
  }

  return DEFAULT_WIDTH;
}
