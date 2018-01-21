/** @jsx h */

import {h, Component} from 'preact'
const LEFT_KEYS = [
  33, // pgup
  37 // arrow left
]
const RIGHT_KEYS = [
  32, // space
  34, // pgdn
  39 // arrow right
]

class ScrollOnEventHandler extends Component {
  constructor () {
    super()
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentWillMount () {
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  shouldComponentUpdate () {
    return false
  }

  handleKeyUp (e) {
    const keyCode = e.keyCode || e.detail.keyCode
    const { onPrevious, onNext } = this.props

    if (LEFT_KEYS.indexOf(keyCode) !== -1) {
      e.preventDefault()
      onPrevious()
    } else if (RIGHT_KEYS.indexOf(keyCode) !== -1) {
      e.preventDefault()
      onNext()
    }
  }

  render () {
    return <span />
  }
}

export default ScrollOnEventHandler
