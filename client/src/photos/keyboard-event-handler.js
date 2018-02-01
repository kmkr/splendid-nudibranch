/** @jsx h */

import { h, Component } from 'preact'
const LEFT_KEYS = [
  33, // pgup
  37 // arrow left
]
const RIGHT_KEYS = [
  32, // space
  34, // pgdn
  39 // arrow right
]
const SIDEBAR_KEYS = [
  27, // ESC
  73 // i
]

class KeyboardEventHandler extends Component {
  constructor() {
    super()
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentWillMount() {
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  shouldComponentUpdate() {
    return false
  }

  handleKeyUp(e) {
    const keyCode = e.keyCode || e.detail.keyCode
    const { onPrevious, onNext, onToggleSidebar } = this.props

    if (e.altKey) {
      return
    }

    if (LEFT_KEYS.indexOf(keyCode) !== -1) {
      e.preventDefault()
      onPrevious()
    } else if (RIGHT_KEYS.indexOf(keyCode) !== -1) {
      e.preventDefault()
      onNext()
    } else if (SIDEBAR_KEYS.indexOf(keyCode) !== -1) {
      e.preventDefault()
      onToggleSidebar()
    }
  }

  render() {
    return null
  }
}

export default KeyboardEventHandler
