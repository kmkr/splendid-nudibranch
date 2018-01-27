/** @jsx h */
import { h, Component } from 'preact'

class TransitionImage extends Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
    this.onLoad = this.onLoad.bind(this)
  }

  onLoad() {
    if (this.state.visible) {
      // Some browsers call onLoad multiple times, perhaps due to srcSet
      return
    }

    this.setState({
      visible: true
    })
  }

  render({ alt, onClick, src, srcSet, sizes }) {
    return (
      <img
        alt={alt || ''}
        className="transition-image"
        onClick={onClick}
        onLoad={this.onLoad}
        style={{ opacity: this.state.visible ? 1 : 0 }}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
      />
    )
  }
}

export default TransitionImage
