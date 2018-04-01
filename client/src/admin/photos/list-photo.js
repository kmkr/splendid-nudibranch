/** @jsx h */
import { h, Component } from 'preact'
import arrayMove from './array-move'

class ListPhoto extends Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
  }

  handleDelete(e) {
    e.preventDefault()
    this.props.onDeleteClick(this.props.photo)
  }

  handleOrderChange(e) {
    e.preventDefault()
    this.props.onOrderUpdate(this.props.photo, e.target.value)
  }

  render({ order, photo, onDeleteClick, showText }) {
    return (
      <div class="list-photo">
        <div class="center">
          <h3>
            {photo.name}
            <button class="danger" onClick={this.handleDelete}>
              ✖
            </button>
          </h3>
          <img src={photo.sizes.thumb.url} />
          <div>
            <label>
              Order
              <input
                type="number"
                value={order}
                onChange={this.handleOrderChange}
              />
            </label>
          </div>
        </div>
        {showText && (
          <div>
            <p>{photo.title}</p>
            <p>{photo.location}</p>
            <p>{photo.latin}</p>
            <p>{photo.description}</p>

            <div class="tags">
              {photo.tags.sort().map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default ListPhoto
