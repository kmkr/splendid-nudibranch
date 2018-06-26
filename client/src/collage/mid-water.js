/** @jsx h */
import { h } from 'preact'

const MidWater = ({ onClick }) => (
  <div id="mid-water">
    <p>
      No more {window.snFeatureName} photos. Descend deeper to explore more.
    </p>
    <div class="arrow" />
  </div>
)

export default MidWater
