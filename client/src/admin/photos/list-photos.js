/** @jsx h */
import { h } from 'preact'

const ListPhotos = ({ photos, onDeleteClick }) => (
  <div className="list-photos">
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
        <p>{photo.title}</p>
        <p>{photo.location}</p>
        <p>{photo.latin}</p>
        <p>{photo.description}</p>

        <div className="tags">
          {photo.tags.sort().map(tag => <span key={tag}>{tag}</span>)}
        </div>

        <div>
          {photo.error && (
            <p style={{ color: 'red' }}>Something bad happened!</p>
          )}
        </div>
      </div>
    ))}
  </div>
)

export default ListPhotos
