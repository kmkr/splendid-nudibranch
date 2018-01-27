/** @jsx h */
import { h, Component } from 'preact'

const Navigation = ({ onHome }) => (
  <div id="navigation">
    <a class="home" href="/" title="All photos" onClick={onHome}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85.04 54.67">
        <rect
          fill="currentColor"
          class="cls-1"
          y="20.25"
          width="24.3"
          height="14.17"
        />
        <rect fill="currentColor" y="40.49" width="24.3" height="14.17" />
        <rect
          fill="currentColor"
          x="30.37"
          y="20.25"
          width="24.3"
          height="14.17"
        />
        <rect
          fill="currentColor"
          x="60.74"
          y="20.25"
          width="24.3"
          height="14.17"
        />
        <rect
          fill="currentColor"
          x="30.37"
          y="40.49"
          width="24.3"
          height="14.17"
        />
        <rect
          fill="currentColor"
          x="60.74"
          y="40.49"
          width="24.3"
          height="14.17"
        />
        <rect fill="currentColor" width="24.3" height="14.17" />
        <rect fill="currentColor" x="30.37" width="24.3" height="14.17" />
        <rect fill="currentColor" x="60.74" width="24.3" height="14.17" />
      </svg>
    </a>
    <div class="link-wrapper">
      <a href="/" onClick={onHome}>
        See all photos
      </a>
    </div>
  </div>
)
export default Navigation
