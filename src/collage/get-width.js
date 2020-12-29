export default function getWidth() {
  return document.scrollWidth || document.body.clientWidth || window.innerWidth;
}
