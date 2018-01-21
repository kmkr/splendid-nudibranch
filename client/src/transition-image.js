/** @jsx h */
import {h, Component} from 'preact'

class TransitionImage extends Component {
  constructor () {
    super()
    this.state = {
      visible: false
    }
    this.onLoad = this.onLoad.bind(this)
  }

  componentDidMount () {
    this.img.onload = this.onLoad
    this.img.setAttribute('src', this.props.src)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.src !== this.props.src) {
      this.img.setAttribute('src', this.props.src)
      this.setState({
        visible: false
      })
    }
  }

  onLoad () {
    if (this.state.visible) {
      // Some browsers call onLoad multiple times, perhaps due to srcSet
      return
    }

    this.setState({
      visible: true
    })
  }

  render () {
    const {alt, onClick, srcSet, sizes, width} = this.props

    return (
      <img
        alt={alt || ''}
        ref={img => { this.img = img }}
        className='transition-image'
        onClick={onClick || (() => {})}
        style={{opacity: this.state.visible ? 1 : 0}}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
      />
    )
  }
}

export default TransitionImage
