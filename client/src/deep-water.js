/** @jsx h */
import { h } from 'preact'

const DeepWater = ({ onHome }) => (
  <div id="deep-water">
    <img class="barracuda" src="/static/images/barracuda.svg" />
    <img class="anemone" src="/static/images/anemone.svg" />
    <div class="jellyfish-wrapper">
      <img class="jellyfish" src="/static/images/jellyfish.svg" />
    </div>

    <div class="link-wrapper">
      <a href="#" onClick={onHome}>
        DROP YOUR WEIGHTS
      </a>
    </div>
  </div>
)

export default DeepWater
