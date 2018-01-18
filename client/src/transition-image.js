/** @jsx h */
import {h, Component} from 'preact'

class TransitionImage extends Component {
  constructor () {
    super()
    this.state = {loaded: false}
    this.onLoad = this.onLoad.bind(this)
  }

  componentDidMount () {
    this.img.onload = this.onLoad
    this.img.setAttribute('src', this.props.src)
  }

  onLoad () {
    if (this.state.loaded) {
      // Some browsers call onLoad multiple times, perhaps due to srcSet
      return
    }

    this.setState({
      loaded: true
    })
  }

  render () {
    const {alt, srcSet, sizes, width} = this.props

    return (
      <img
        alt={alt || ''}
        ref={img => { this.img = img }}
        className='transition-image'
        style={{opacity: this.state.loaded ? 1 : 0}}
        srcSet={srcSet}
        sizes={sizes}
        width={width} />
    )
  }
}

export default TransitionImage
