import React, {Component, PropTypes} from 'react';
import './edit-photo.scss';

class EditPhoto extends Component {
    render() {
        const {photo, onDeleteClick} = this.props;

        return (
            <div className="edit-photo row">
                <div className="col-sm-10">
                    <input
                        placeholder="Title"
                        disabled
                        value={photo.title}/>
                    <input
                        placeholder="Location"
                        disabled
                        value={photo.location}/>
                    <input
                        placeholder="Latin"
                        disabled
                        value={photo.latin}/>
                    <textarea
                        placeholder="Photo description"
                        disabled
                        value={photo.description}/>

                    <div className="tags">
                        {photo.tags.sort().map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                </div>

                <div className="col-sm-4">
                    <button
                        className={`danger ${photo.deleting ? 'active' : ''}`}
                        disabled={photo.deleting}
                        onClick={onDeleteClick.bind(this, photo)}>
                        Delete
                    </button>

                    {photo.error && <p style={{color: 'red'}}>Something bad happened!</p>}
                </div>
            </div>
        );
    }
}

EditPhoto.propTypes = {
    photo: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default EditPhoto;
