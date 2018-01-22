/** @jsx h */
import { h, Component } from 'preact'

import PhotoText from './photo-text'

const TOGGLE_KEYS = [
  13, // enter
  32 // space
]

class Sidebar extends Component {
  constructor () {
    super()
    this.handleClickDetails = this.handleClickDetails.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      expanded: true
    }
  }

  handleClickDetails (e) {
    e.preventDefault()
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleKeyDown (e) {
    const keyCode = e.keyCode || e.detail.keyCode
    if (this.isClickable() && TOGGLE_KEYS.indexOf(keyCode) !== -1) {
      e.preventDefault()
      e.stopPropagation()
      this.handleClickDetails()
    }
  }

  render () {
    const { photo } = this.props
    const { expanded } = this.state

    return (
      <div>
        <div id='sidebar' onClick={this.handleClickDetails}>
          <div
            className={expanded ? 'expanded' : ''}
            onKeyDown={this.handleKeyDown}
          >
            <a href='#' tabIndex='0' aria-role='button'>+</a>
          </div>
        </div>

        <div id='sidebar-text' class={expanded ? 'expanded' : ''}>
          <PhotoText photo={photo} />
        </div>
      </div>
    )
  }
}

export default Sidebar
