/** @jsx h */
import { h, render } from "./preact";
import "../polyfills";
import "./polyfills";
import App from "./app";
const photos = window.snPhotos;

render(<App photos={photos} />, document.getElementById("app"));
