/** @jsx h */

import { h, Component } from 'preact'

class TouchEventHandler extends Component {
  constructor() {
    super()
    this.xDown = null
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
  }

  componentDidMount() {
    document.addEventListener('touchstart', this.handleTouchStart, false)
    document.addEventListener('touchmove', this.handleTouchMove, false)
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.handleTouchStart)
    document.removeEventListener('touchmove', this.handleTouchMove)
  }

  shouldComponentUpdate() {
    return false
  }

  handleTouchStart(evt) {
    this.xDown = evt.touches[0].clientX
  }

  handleTouchMove(evt) {
    if (!this.xDown) {
      return
    }

    const { onNext, onPrevious } = this.props

    const xUp = evt.touches[0].clientX

    const xDiff = this.xDown - xUp

    if (xDiff > 0) {
      onPrevious()
    } else {
      onNext()
    }
    this.xDown = null
  }

  render() {
    return null
  }
}

export default TouchEventHandler
