/** @jsx h */
import { h, Component } from 'preact'

import PhotoText from './photo-text'

class Sidebar extends Component {
  constructor() {
    super()
    this.handleClickDetails = this.handleClickDetails.bind(this)
    this.state = {
      expanded: true
    }
  }

  handleClickDetails(e) {
    e.preventDefault()
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    const { photo } = this.props
    const { expanded } = this.state

    return (
      <div>
        <div id="sidebar" onClick={this.handleClickDetails}>
          <div className={expanded ? 'expanded' : ''}>
            <a href="#" tabIndex="0" aria-role="button">
              +
            </a>
          </div>
        </div>

        <div id="sidebar-text" class={expanded ? 'expanded' : ''}>
          <PhotoText photo={photo} />
        </div>
      </div>
    )
  }
}

export default Sidebar
