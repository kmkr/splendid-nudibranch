/** @jsx h */
import { h } from 'preact'

const MidWater = ({ onClick }) => (
  <div id="mid-water">
    <p>
      No more photos for your current filter &mdash; {window.snFeatureName}{' '}
      &mdash; but plenty of other photos below.
    </p>
  </div>
)

export default MidWater
