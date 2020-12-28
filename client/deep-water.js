/** @jsx h */
import { h } from "../admin/preact";

const DeepWater = ({ onClick }) => (
  <div id="deep-water">
    <div id="license">
      <p xmlnsDct="http://purl.org/dc/terms/" property="dct:title">
        The Splendid Nudibranch
      </p>
      <p>
        <a
          xmlnsCc="http://creativecommons.org/ns#"
          href="mailto:krismikael-insertathere-protonmail-insertdothere-com"
          property="cc:attributionName"
          rel="cc:attributionURL"
        >
          Kris Mikael Krister
        </a>
      </p>
      <p>
        <a rel="license" href="https://creativecommons.org/licenses/by/4.0/">
          CC BY 4.0
        </a>
      </p>
    </div>

    <div className="link-wrapper">
      <a href="#" onClick={onClick}>
        DROP YOUR WEIGHTS
      </a>
    </div>
  </div>
);

export default DeepWater;
