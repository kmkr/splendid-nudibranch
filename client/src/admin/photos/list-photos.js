/** @jsx h */
import { h, Component } from 'preact'

class ListPhotos extends Component {
  constructor() {
    super()
    this.state = {
      showText: true
    }

    this.toggleText = this.toggleText.bind(this)
  }

  toggleText() {
    this.setState(oldState => ({
      showText: !oldState.showText
    }))
  }

  render({ photos, onDeleteClick }, { showText }) {
    return (
      <div className="list-photos">
        <label>
          Show text
          <input type="checkbox" checked={showText} onClick={this.toggleText} />
        </label>
        {photos.map(photo => (
          <div key={photo.key}>
            <div className="center">
              <h3>
                {photo.name}
                <button
                  className={`danger ${photo.deleting ? 'active' : ''}`}
                  disabled={photo.deleting}
                  onClick={onDeleteClick.bind(this, photo)}
                >
                  ✖
                </button>
              </h3>
              <img src={photo.sizes.thumb.url} />
            </div>
            {showText && (
              <div>
                <p>{photo.title}</p>
                <p>{photo.location}</p>
                <p>{photo.latin}</p>
                <p>{photo.description}</p>

                <div className="tags">
                  {photo.tags.sort().map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
}

export default ListPhotos
