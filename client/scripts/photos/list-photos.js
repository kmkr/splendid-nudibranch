import React, {PropTypes} from 'react';

const ListPhotos = ({photos, onDeleteClick}) => (
    <div>
        {photos.map(photo => (
            <span key={photo.key}>
                <img src={photo.small} />
                <button onClick={onDeleteClick.bind(this, photo)}>
                    Del
                </button>
            </span>
        ))}
    </div>
);

ListPhotos.propTypes = {
    photos: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default ListPhotos;
