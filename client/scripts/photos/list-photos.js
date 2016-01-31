import React, {PropTypes} from 'react';

const ListPhotos = ({photos}) => (
    <div className="row">
        {photos.map(photo => (
            <div
                key={photo.key}
                className="col-md-4">
                <img src={photo.small} />
                <p>{photo.description}</p>
            </div>
        ))}
    </div>
);

ListPhotos.propTypes = {
    photos: PropTypes.array.isRequired
};

export default ListPhotos;
