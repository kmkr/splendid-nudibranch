/** @jsx h */
import { h, render } from "./preact";
import "../../polyfills";
import "../polyfills";
import StatsApp from "./app";

render(<StatsApp />, document.getElementById("app"));
