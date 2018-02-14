/** @jsx h */
import { h } from 'preact'

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

    <div class="link-wrapper">
      <a href="#" onClick={onClick}>
        DROP YOUR WEIGHTS
      </a>
    </div>

    <div id="social">
      <a href="https://wwww.500px.com/krismikael">
        <img src="static/images/logo-500px.svg" />
      </a>
      <a href="https://www.unsplash.com/@kmkr">
        <img src="static/images/logo-unsplash.svg" />
      </a>
      <a href="https://www.flickr.com/photos/148835878@N08/">
        <img src="static/images/logo-flickr.svg" />
      </a>
    </div>
  </div>
)

export default DeepWater
