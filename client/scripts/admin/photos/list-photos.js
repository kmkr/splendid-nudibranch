import React, {PropTypes} from 'react';

const ListPhotos = ({photos, onDeleteClick}) => (
    <div className="row">
        {photos.map(photo => (
            <div className="col-lg-6" key={photo.key}>
                <img src={photo.small} />
                <button onClick={onDeleteClick.bind(this, photo)}>
                    Del
                </button>
            </div>
        ))}
    </div>
);

ListPhotos.propTypes = {
    photos: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default ListPhotos;
