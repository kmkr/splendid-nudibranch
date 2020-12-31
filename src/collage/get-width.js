// Can't run server side!

export default function getWidth() {
  return document.scrollWidth || document.body.clientWidth || window.innerWidth;
}
