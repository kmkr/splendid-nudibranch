/** @jsx h */
import { h, Component } from 'preact'

class Navigation extends Component {
  constructor() {
    super()
    this.onPrevious = this.onPrevious.bind(this)
    this.onNext = this.onNext.bind(this)
  }

  onNext(e) {
    e.preventDefault()
    this.props.onNext()
  }

  onPrevious(e) {
    e.preventDefault()
    this.props.onPrevious()
  }

  render() {
    return (
      <div class="navigation">
        <span class="link-wrapper">
          <a href="#" onClick={this.onPrevious}>
            Previous
          </a>
        </span>
        <span class="link-wrapper">
          <a href="/" onClick={this.props.onHome}>
            Home
          </a>
        </span>
        <span class="link-wrapper">
          <a href="#" onClick={this.onNext}>
            Next
          </a>
        </span>
      </div>
    )
  }
}

export default Navigation
